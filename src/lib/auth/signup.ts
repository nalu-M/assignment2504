// lib/auth/signup.ts
import { Auth } from 'aws-amplify';
import { handleError } from '@/utils/handle-error';

export const signUp = async (email: string, password: string) => {
  try {
    await Auth.signUp({
      username: email,
      password,
    });
  } catch (err) {
    throw new Error(handleError(err, 'サインアップに失敗しました'));
  }
};
