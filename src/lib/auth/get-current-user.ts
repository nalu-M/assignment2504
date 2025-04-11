import { Auth } from 'aws-amplify';
import type { CognitoUser } from 'amazon-cognito-identity-js';

/**
 * 現在ログイン中の CognitoUser を取得する
 * @returns CognitoUser（属性を含む）
 */
export const getCurrentUser = async (): Promise<CognitoUser & { attributes: Record<string, string> }> => {
  try {
    const user = await Auth.currentAuthenticatedUser();
    return user;
  } catch {
    // error を使っていないので変数名も削除 or _error にして回避
    throw new Error('ユーザーの取得に失敗しました');
  }
};
