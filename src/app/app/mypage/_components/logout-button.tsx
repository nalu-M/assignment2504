'use client';

import { useState, useEffect } from "react";
import { Auth } from "aws-amplify";
import { useRouter } from "next/navigation";

const LogOutButton = () => {
    const router = useRouter();
    const [login, setLogin] = useState<boolean>(false);

    useEffect(() => {
        const checkUser = async () => {
            try {
                await Auth.currentAuthenticatedUser();
                setLogin(true);
            } catch {
                setLogin(false);
            };
        };
    
        checkUser();

        const interval = setInterval(checkUser, 5000);

        return () => clearInterval(interval);
    }, []);
    
    const handleLogOut = async () => {
        try {
            await Auth.signOut();
            setLogin(false);
            router.push("/login");
        } catch (error) {
            console.error("ログアウトに失敗しました", error);
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