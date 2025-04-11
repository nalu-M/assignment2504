'use client';

import { useState } from '@/hooks/use-state';
import { useEffect } from '@/hooks/use-effect';
import { useRouter } from '@/hooks/use-router';
import { isAuthenticated } from '@/lib/auth/check-user';
import { logout } from '@/lib/auth/logout';

const LogOutButton = () => {
  const router = useRouter();
  const [login, setLogin] = useState<boolean>(false);

  useEffect(() => {
    const checkLogin = async () => {
      const result = await isAuthenticated();
      setLogin(result);
    };

    checkLogin();

    const interval = setInterval(checkLogin, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleLogOut = async () => {
    try {
      await logout();
      setLogin(false);
      router.push("/login");
    } catch (error) {
      console.error(error);
    }
  };

  if (!login) return null;

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
