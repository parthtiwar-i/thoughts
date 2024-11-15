import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from "hono/jwt";
import {
  createBlogInputs,
  updateBlogInputs,
} from "@parthtiwar_i/thoughts-common";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRETE: string;
  };
}>();

//Middlewares
blogRouter.use("/*", async (c, next) => {
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
      await next();
    } else {
      new Error("Not authorised");
      return;
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

  const { success } = createBlogInputs.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({ message: "Invalid inputs" });
  }
  const user = c.get("jwtPayload");

  const blog = await prisma.post.create({
    data: {
      title: body.title,
      content: body.content,
      published: true,
      authorId: user.id,
    },
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

  const { success } = updateBlogInputs.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({ message: "Invalid inputs" });
  }
  const blog = await prisma.post.update({
    where: {
      id,
    },
    data: {
      title: body.title,
      content: body.content,
    },
  });
  return c.json({ message: "Updated successsfuly ", blog });
});

//Delete
blogRouter.delete("/:id", async (c) => {
  const id = c.req.param("id");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  //TODO: check blog author

  try {
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
    console.log(user.id);
    const userBlogs = await prisma.post.findMany({
      where: {
        authorId: user.id,
      },
      select: {
        published: true,
        id: true,
        title: true,
        content: true,
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
