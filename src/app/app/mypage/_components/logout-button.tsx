'use client';

import { useEffect } from 'react';
import { useRouter } from '@/hooks/use-router';
import { useUserContext } from '@/features/user/user-context';
import { logout } from '@/lib/auth/logout'; // 必要に応じて調整

const LogOutButton = () => {
  const router = useRouter();
  const { state, dispatch } = useUserContext();
  const { user, loading } = state;

  // ログイン状態のチェックとログアウト処理
  useEffect(() => {
    if (!loading && !user) {
      router.push("/app/login");
    }
  }, [loading, user, router]);

  const handleLogOut = async () => {
    try {
      await logout();
      dispatch({ type: 'LOGOUT' }); // ユーザー情報をリセット
      router.push("/app/login");
    } catch (error) {
      console.error('ログアウト中にエラーが発生しました:', error);
    }
  };

  // ログインしていない場合はログアウトボタンを表示しない
  if (loading || !user) return null;

  return (
    <button
      onClick={handleLogOut}
      className="fixed top-14 right-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition"
    >
      ログアウト
    </button>
  );
};

export default LogOutButton;
