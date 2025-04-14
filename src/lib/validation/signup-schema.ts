import { z } from 'zod';

// サインアップ用のスキーマ
export const signUpSchema = z.object({
  email: z.string().email({ message: '有効なメールアドレスを入力してください' }),
  password: z.string().min(6, { message: 'パスワードは6文字以上である必要があります' }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'パスワードが一致しません',
  path: ['confirmPassword'],
});

// 確認コード用のスキーマ
export const confirmSchema = z.object({
  code: z.string().min(1, '確認コードを入力してください'),
});

// 推論型も必要に応じてエクスポート可能
export type SignUpInput = z.infer<typeof signUpSchema>;
