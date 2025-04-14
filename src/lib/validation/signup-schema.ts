// validation/signUpSchema.ts
import { z } from 'zod';

export const signUpSchema = z
  .object({
    email: z.string().email('正しいメールアドレスを入力してください'),
    password: z.string().min(6, 'パスワードは6文字以上必要です'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'パスワードが一致しません',
  });

export type SignUpInput = z.infer<typeof signUpSchema>;
