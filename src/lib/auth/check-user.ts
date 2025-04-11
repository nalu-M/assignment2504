import { Auth } from 'aws-amplify';

/**
 * 現在認証中のユーザーが存在するかを確認
 * @returns true: ログイン中 / false: 未ログイン
 */
export const isAuthenticated = async (): Promise<boolean> => {
  try {
    await Auth.currentAuthenticatedUser();
    return true;
  } catch {
    return false;
  }
};
