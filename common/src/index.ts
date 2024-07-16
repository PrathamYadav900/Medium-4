import z from "zod";

export const signupInputs = z.object({
  username: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(3),
});

export const signinInputs = z.object({
  username: z.string().email(),
  password: z.string().min(6),
});

export const createBlogInput = z.object({
  title: z.string(),
  content: z.string(),
});

export const updateBlogInput = z.object({
  title: z.string(),
  content: z.string(),
});

// type inference in zod

export type SignupInputs = z.infer<typeof signupInputs>;
export type SinginInputs = z.infer<typeof signinInputs>;
export type CreateBlogInput = z.infer<typeof createBlogInput>;
export type UpdateBlogInput = z.infer<typeof updateBlogInput>;
