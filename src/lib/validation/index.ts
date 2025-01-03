import * as z from "zod";

export const SignupValidation = z.object({
  name: z.string().min(2, {
    message: "name must be at least 2 characters.",
  }),
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, {
    message: "Too short at Least 8 Character.",
  }),
});

export const SignInValidation = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, {
    message: "Too short at Least 8 Character.",
  }),
});

export const PostValidation = z.object({
  caption: z.string().min(2).max(2200),
  file: z.custom<File[]>(),
  tags: z.string(),
  location: z.string().min(2).max(100),
});
export const UserValidation = z.object({
  name: z.string().min(2, {
    message: "name must be at least 2 characters.",
  }),
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, {
    message: "Too short at Least 8 Character.",
  }),
});
