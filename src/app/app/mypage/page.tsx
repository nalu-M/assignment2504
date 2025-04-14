'use client';

import { useEffect } from '@/hooks/use-effect';
import { useUserContext } from '@/features/user/user-context';
import { getCurrentUser } from '@/lib/auth/get-current-user';
import LogOutButton from '@/app/app/mypage/_components/logout-button';
import type { CognitoUser } from 'amazon-cognito-identity-js';

type UserAttributes = {
  sub: string;
  email: string;
  email_verified?: boolean;
  [key: string]: unknown;
};

const MyPage = () => {
  const { state, dispatch } = useUserContext();
  const { user, attributes, error, loading } = state;

  useEffect(() => {
    const fetchUser = async () => {
      dispatch({ type: 'SET_LOADING', payload: true });
      try {
        const cognitoUser = await getCurrentUser();
        dispatch({
          type: 'SET_USER',
          payload: {
            user: cognitoUser,
            attributes: cognitoUser.attributes as UserAttributes,
          },
        });
      } catch (err) {
        if (err instanceof Error) {
          console.error(err.message);
        }
        dispatch({ type: 'SET_ERROR', payload: 'ログインしていません' });
      }
    };

    fetchUser();
  }, [dispatch]);

  if (loading) {
    return <p className="text-center text-gray-500">loading...</p>;
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-128 mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">ユーザー情報</h2>
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="space-y-2">
            <p>
              <span className="font-semibold">ユーザー名:</span> {user?.getUsername()}
            </p>
            <p>
              <span className="font-semibold">ユーザーID (sub):</span> {attributes?.sub}
            </p>
            <p>
              <span className="font-semibold">メールアドレス:</span> {attributes?.email}
            </p>
          </div>
        )}
      </div>
      <LogOutButton />
    </div>
  );
};

export default MyPage;
