import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from "hono/jwt";
import {
  createBlogInputs,
  updateBlogInputs,
} from "@parthtiwar_i/thoughts-common";
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRETE: string;
    AWS_ACCESS_KEY_ID: string;
    AWS_SECRET_ACCESS_KEY: string;
    AWS_REGION: string;
    S3_BUCKET_NAME: string;
  };
}>();

//Middlewares
blogRouter.use("/*", async (c, next) => {
  if (c.req.path.split("/")[4] === "all") {
    return await next();
  }
  const authHeader = c.req.header("Authorization");
  if (!authHeader) {
    c.status(401);
    return c.json({ error: "Missing Authorization header" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const payload = await verify(token, c.env.JWT_SECRETE);
    if (payload) {
      c.set("jwtPayload", payload);
      return await next();
    } else {
      throw new Error("Not authorised");
    }
  } catch (error) {
    c.status(401);
    return c.json({ error: "Invalid or expired token" });
  }
});

//Routes

//Get one blog
blogRouter.get("/:id/blog", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const id = c.req.param("id");
  try {
    const blog = await prisma.post.findFirst({
      where: {
        id: id,
      },
      select: {
        id: true,
        title: true,
        content: true,
        titleImage: true,
        author: {
          select: {
            name: true,
            id: true,
          },
        },
      },
    });
    return c.json({ message: "Success", blog });
  } catch (error) {
    return c.json({ message: "Error cant find blog", error });
  }
});

//Get all (TODO : apply pagination)
blogRouter.get("/all", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const blogs = await prisma.post.findMany({
      select: {
        title: true,
        content: true,
        titleImage: true,
        id: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    });
    return c.json({ message: "Success", blogs });
  } catch (error) {
    return c.json({ message: "Error can not find blogs", error });
  }
});

//Create
blogRouter.post("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();

  //TODO - add imageTitle type to the zod validation
  const { success } = createBlogInputs.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({ message: "Invalid inputs" });
  }
  const user = c.get("jwtPayload");

  const blog = await prisma.post.create({
    data: { ...body, published: true, authorId: user.id },
  });
  return c.json({ message: "Blog created successsfuly ", blog });
});

//Update
blogRouter.patch("/:id", async (c) => {
  const id = c.req.param("id");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  const { success } = updateBlogInputs.safeParse(body); // here also add the titleImage type to zod validation
  if (!success) {
    c.status(411);
    return c.json({ message: "Invalid inputs" });
  }
  const blog = await prisma.post.update({
    where: {
      id,
    },
    data: { ...body },
  });
  return c.json({ message: "Updated successsfuly ", blog });
});

//Delete
blogRouter.delete("/:id", async (c) => {
  const id = c.req.param("id");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const s3 = new S3Client({
    region: c.env.AWS_REGION,
    credentials: {
      accessKeyId: c.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: c.env.AWS_SECRET_ACCESS_KEY!,
    },
  });

  try {
    //Retrieve the blog post to get the image URL
    const blog = await prisma.post.findUnique({
      where: { id },
      select: { titleImage: true, authorId: true },
    });

    if (!blog) {
      return c.json({ message: "Blog not found" }, 404);
    }

    if (c.get("jwtPayload").id !== blog?.authorId) {
      throw new Error("Not authorised");
    }

    // TODO:- work on delete
    if (blog.titleImage) {
      //Extract file name from URL (S3 URL format: https://bucket.s3.amazonaws.com/filename)
      const imageUrl = new URL(blog.titleImage);
      const fileName = imageUrl.pathname.substring(1); // Remove leading `/`

      // Step 3: Delete image from S3
      const deleteParams = {
        Bucket: c.env.S3_BUCKET_NAME,
        Key: fileName,
      };

      await s3.send(new DeleteObjectCommand(deleteParams));
      console.log("Image deleted from S3:", fileName);
    }

    const deletedBlog = await prisma.post.delete({
      where: {
        id,
      },
    });
    return c.json({ message: "Deleted successsfuly", deletedBlog });
  } catch (error) {
    c.json({ message: "Error cannot delete", error });
  }
});

//Get users posted blogs

blogRouter.get("/user-blogs", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const user = c.get("jwtPayload");

  try {
    const userBlogs = await prisma.post.findMany({
      where: {
        authorId: user.id,
      },
      select: {
        published: true,
        id: true,
        title: true,
        content: true,
        titleImage: true,
        createdAt: true,
        author: {
          select: {
            name: true,
            id: true,
          },
        },
      },
    });
    return c.json(userBlogs, user);
  } catch (error) {
    return c.json({ message: "Unable to fetch blogs! please retry", error });
  }
});

// upload blog image route

blogRouter.post("/upload-image", async (c) => {
  const formData = await c.req.formData();
  const file = formData.get("titleImage") as File | null;
  console.log(file);

  if (!file) {
    return c.json({ error: "No file uploaded" }, 400);
  }

  const arrayBuffer = await file.arrayBuffer(); // Convert to Buffer
  const uniqueFileName = `${Date.now()}-${file.name}`;

  const s3 = new S3Client({
    region: c.env.AWS_REGION,
    credentials: {
      accessKeyId: c.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: c.env.AWS_SECRET_ACCESS_KEY!,
    },
  });

  const uploadCommand = new PutObjectCommand({
    Bucket: c.env.S3_BUCKET_NAME,
    Key: uniqueFileName,
    Body: new Uint8Array(arrayBuffer), //convert to uint8array as it allow modification and can be updated while arrayBuffer cant. The AWS SDK expects Body to be Uint8Array | ReadableStream | string, not ArrayBuffer.
    ContentType: file.type,
  });

  await s3.send(uploadCommand);

  const imageUrl = `https://${c.env.S3_BUCKET_NAME}.s3.amazonaws.com/${uniqueFileName}`;

  return c.json({ imageUrl }); // Send image URL back to frontend
});
