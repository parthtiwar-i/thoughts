import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign, verify } from "hono/jwt";
import { signInInput, signUpInput } from "@parthtiwar_i/thoughts-common";
import { hashPassword, verifyPassword } from "../utils/hashing";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRETE: string;
  };
}>();

//middleware for routes with users name
userRouter.use("/users", async (c, next) => {
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
userRouter.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const { success } = signUpInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({ message: "Invalid inputs" });
  }
  const { salt, hash } = await hashPassword(body.password);
  try {
    const user = await prisma.user.create({
      data: {
        email: body.email,
        name: body.name,
        password: hash,
        salt,
      },
    });
    const payload = { id: user.id };
    const token = await sign(payload, c.env.JWT_SECRETE);
    return c.json({
      user,
      token,
    });
  } catch (error) {
    c.status(403);
    return c.json({ message: "Error cant signUp" });
  }
});

userRouter.post("/login", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const { success, error } = signInInput.safeParse(body);

  if (!success) {
    c.status(411);
    return c.json({ message: "Invalid inputs" });
  }
  const user = await prisma.user.findUnique({
    where: {
      email: body.email,
    },
  });
  if (!user) {
    c.status(403);
    return c.json({ error: "No user available with this username/password" });
  }
  const isPasswordMatch = await verifyPassword(
    body.password,
    user?.password,
    user?.salt
  );
  if (isPasswordMatch) {
    const token = await sign({ id: user.id }, c.env.JWT_SECRETE);
    return c.json({ token, message: "Signed up successsfuly " });
  }
  return c.json({ error: "unauthorised" });
});

//Authentiacte jwt token
userRouter.get("/authenticate", async (c) => {
  const authHeader = c.req.header("Authorization");
  if (!authHeader) {
    c.status(401);
    return c.json({ error: "Missing Authorization header" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const payload = await verify(token, c.env.JWT_SECRETE);
    if (payload) {
      return c.json({ verified: true });
    }
  } catch (error) {
    return c.json({ verified: false });
  }
});

userRouter.get("/users", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const user = c.get("jwtPayload");
  try {
    if (user) {
      const userData = await prisma.user.findUnique({
        where: {
          id: user.id,
        },
        select: {
          email: true,
          name: true,
          id: true,
        },
      });
      return c.json({ userData });
    }
  } catch (error) {
    return c.json({ message: "No user found" });
  }
});
