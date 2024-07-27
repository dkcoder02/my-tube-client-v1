import * as z from "zod";

export const signUpSchema = z.object({
  userName: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long" })
    .max(20, { message: "Username must be at most 20 characters long" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
  email: z.string().email({ message: "Invalid email address" }),
  avatar: z
    .any()
    .refine((files) => files instanceof FileList && files.length > 0, {
      message: "Avatar must be a file",
    }),
  fullName: z
    .string()
    .min(1, { message: "Full name is required" })
    .max(50, { message: "Full name must be at most 50 characters long" }),
});
