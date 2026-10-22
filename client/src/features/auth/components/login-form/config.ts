import * as z from 'zod';

// Mirrors the server rules for POST /auth/login (valid email, password ≥ 8)
export const loginFormSchema = z
  .object({
    email: z.email('Enter a valid email address'),
    password: z.string(),
  })

export type LoginFormSchema = z.infer<typeof loginFormSchema>;
