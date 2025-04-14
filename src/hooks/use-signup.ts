import { useState } from '@/hooks/use-state';
import { useRouter } from '@/hooks/use-router';
import { signUp } from '@/lib/auth/signup';
import { confirmSignUp } from '@/lib/auth/confirm-signup';
import { z } from 'zod';

// Zod スキーマ定義
const signUpSchema = z.object({
  email: z.string().email({ message: '有効なメールアドレスを入力してください' }),
  password: z
    .string()
    .min(6, { message: 'パスワードは6文字以上である必要があります' }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'パスワードが一致しません',
  path: ['confirmPassword'],
});
const confirmSchema = z.object({
  code: z.string().min(1, '確認コードを入力してください'),
})

type SignUpInput = z.infer<typeof signUpSchema>;

export function useSignUp() {
  const router = useRouter();
  const [step, setStep] = useState<'signup' | 'confirm'>('signup');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [signUpFieldErrors, setSignUpFieldErrors] = useState<Partial<Record<keyof SignUpInput, string>>>({});
  const [confirmFieldErrors, setConfirmFieldErrors] = useState<{ code?: string}>({});
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSignUpFieldErrors({});
    setLoading(true);

    const input = { email, password, confirmPassword };

    const result = signUpSchema.safeParse(input);

    if (!result.success) {
      const errors: typeof signUpFieldErrors = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof SignUpInput;
        errors[field] = err.message;
      });
      setSignUpFieldErrors(errors);
      setLoading(false);
      return;
    }

    try {
      await signUp(email, password);
      setStep('confirm');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'サインアップに失敗しました');
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setConfirmFieldErrors({});

    const result = confirmSchema.safeParse({ code });

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setConfirmFieldErrors({
        code: fieldErrors.code?.[0],
      });
      return;
    }

    try {
      setLoading(true);
      await confirmSignUp(email, code);
      router.push('/app/login');
    } catch (err) {
      setError(err instanceof Error ? err.message : '認証に失敗しました');
    } finally {
      setLoading(false);
    }
  };

  return {
    step,
    email,
    password,
    confirmPassword,
    code,
    error,
    signUpFieldErrors,
    confirmFieldErrors,
    loading,
    setEmail,
    setPassword,
    setConfirmPassword,
    setCode,
    handleSignUp,
    handleConfirmSignUp,
  };
}
