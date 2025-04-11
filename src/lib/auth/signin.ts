import { Auth } from 'aws-amplify';

export const signIn = async (email: string, password: string) => {
  try {
    return await Auth.signIn({ username: email, password });
  } catch (err) {
    throw new Error(err instanceof Error ? err.message : 'ログインに失敗しました');
  }
};
