import { useState } from '@/hooks/use-state';
import { useRouter } from '@/hooks/use-router';
import { signUp } from '@/lib/auth/signup';
import { confirmSignUp } from '@/lib/auth/confirm-signup';

export function useSignUp() {
  const router = useRouter();
  const [step, setStep] = useState<'signup' | 'confirm'>('signup');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError('パスワードが一致しません');
      return;
    }

    try {
      setLoading(true);
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

    try {
      setLoading(true);
      await confirmSignUp(email, code);
      router.push('/login');
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
    loading,
    setEmail,
    setPassword,
    setConfirmPassword,
    setCode,
    handleSignUp,
    handleConfirmSignUp,
  };
}
