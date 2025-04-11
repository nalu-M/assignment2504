'use client';

import { useSignUp } from '@/hooks/use-signup';
import { SignUpForm } from '@/app/app/signup/_components/signup-form';
import { ConfirmForm } from '@/app/app/signup/_components/confirm-form';

export default function SignUp() {
  const signUpProps = useSignUp();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        {signUpProps.step === 'signup' ? (
          <SignUpForm {...signUpProps} />
        ) : (
          <ConfirmForm {...signUpProps} />
        )}
      </div>
    </div>
  );
}
