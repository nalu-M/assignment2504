'use client';

import { useSignUp } from '@/hooks/use-signup';
import { SignUpForm } from '@/app/app/signup/_components/signup-form';
import { ConfirmForm } from '@/app/app/signup/_components/confirm-form';

export default function SignUp() {
  const {
    step,
    email,
    password,
    confirmPassword,
    code,
    error,
    signUpFieldErrors,
    loading,
    setEmail,
    setPassword,
    setConfirmPassword,
    setCode,
    handleSignUp,
    handleConfirmSignUp,
  } = useSignUp();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        {step === 'signup' ? (
          <SignUpForm
            email={email}
            password={password}
            confirmPassword={confirmPassword}
            setEmail={setEmail}
            setPassword={setPassword}
            setConfirmPassword={setConfirmPassword}
            handleSignUp={handleSignUp}
            error={error}
            loading={loading}
            errors={signUpFieldErrors} // ← フィールドエラーを渡す
          />
        ) : (
          <ConfirmForm
            code={code}
            setCode={setCode}
            error={error}
            loading={loading}
            handleConfirmSignUp={handleConfirmSignUp}
          />
        )}
      </div>
    </div>
  );
}
