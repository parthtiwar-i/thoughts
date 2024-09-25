import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";
import { signInInput, signUpInput } from "@parthtiwar_i/thoughts-common";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRETE: string;
  };
}>();

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
  //hash password
  try {
    const user = await prisma.user.create({
      data: {
        email: body.email,
        name: body.name,
        password: body.password,
      },
    });
    const payload = { userId: user.id };
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
  if (user?.password === body.password) {
    const token = await sign({ id: user.id }, c.env.JWT_SECRETE);
    return c.json({ token, message: "Signed up successsfuly " });
  }
  return c.json({ error: "unauthorised" });
});
