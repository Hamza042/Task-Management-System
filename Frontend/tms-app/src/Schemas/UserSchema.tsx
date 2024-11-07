import { z } from "zod";
import { patterns } from "../constants";

export const UserSchema = z.object({
  username: z.string().min(1, { message: "please type a username" }),
  email: z
    .string()
    .min(1, { message: "please type an email" })
    .refine((email) => patterns.email.test(email), {
      message: "email not valid",
    }),
  password: z
    .string()
    .min(1, { message: "please type a password" }),
    confirmPassword: z
    .string()
   
}).superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords don't match",
        path: ['confirmPassword']
      });
    }
  });

export const LoginSchema = z.object({
    username: z.string().min(1, 'Username is required'),
    password: z.string().min(1, 'Password is required'),
  });
  
export type loginSchema = z.infer<typeof LoginSchema>;  
export type userSchema = z.infer<typeof UserSchema>;
