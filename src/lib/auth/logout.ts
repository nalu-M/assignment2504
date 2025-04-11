import { Auth } from 'aws-amplify';

/**
 * ログアウト処理を行う
 * @throws エラー時には例外を投げる
 */
export const logout = async (): Promise<void> => {
  try {
    await Auth.signOut();
  } catch (error) {
    throw new Error("ログアウトに失敗しました");
  }
};
