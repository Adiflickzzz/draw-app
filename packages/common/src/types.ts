import z from "zod";

export const CreateUserSchema = z.object({
  username: z.string().min(3).max(16),
  name: z.string().min(3).max(16),
  password: z.string().min(3).max(16),
});
export const SignInSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(3),
});
export const Room = z.object({
  name: z.string().min(3).max(20),
});
