// lib/auth/confirm-signup.ts
import { Auth } from 'aws-amplify';
import { handleError } from '@/utils/handle-error';

export const confirmSignUp = async (email: string, code: string) => {
  try {
    await Auth.confirmSignUp(email, code);
  } catch (err) {
    throw new Error(handleError(err, '認証に失敗しました'));
  }
};
