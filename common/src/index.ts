import z from "zod";

//zod schema

//Sign Up
export const signUpInput = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string(),
});

//SignIn
export const signInInput = z.object({
  email: z.string().email(),
  password: z.string(),
});

//Create Blog inputs

export const createBlogInputs = z.object({
  title: z.string(),
  content: z.string(),
});

//Update Blog input
export const updateBlogInputs = z.object({
  title: z.string().optional(),
  content: z.string().optional(),
});

//Type infer
export type SignUpInput = z.infer<typeof signUpInput>;
export type SignInInput = z.infer<typeof signInInput>;
export type CreateBlogInputs = z.infer<typeof createBlogInputs>;
export type UpdateBlogInputs = z.infer<typeof updateBlogInputs>;
