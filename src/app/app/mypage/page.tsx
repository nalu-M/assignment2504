'use client';

import { useState, useEffect } from "react";
import { Auth } from "aws-amplify";
import type { CognitoUser } from "amazon-cognito-identity-js";
import LogOutButton from "@/app/app/mypage/_components/logout-button";

type UserAttributes = {
    sub: string;
    email: string;
    email_verified?: boolean;
    [key: string]: unknown; // もし他にもカスタム属性があるならこの行を追加
  };
  

const MyPage = () => {
    const [user, setUser] = useState<CognitoUser | null>(null);
    const [attributes, setAttributes] = useState<UserAttributes | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const cognitoUser = await Auth.currentAuthenticatedUser() as CognitoUser & {attributes: UserAttributes  }
                setUser(cognitoUser);
                setAttributes(cognitoUser.attributes);
            } catch (err: unknown) {
                if (err instanceof Error) {
                    console.error(err.message);
                }
                setError("ログインしていません");
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

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
                            <span className="font-semibold">ユーザー名:</span>{' '}
                            {user?.getUsername()}
                        </p>
                        <p>
                            <span className="font-semibold">ユーザーID (sub):</span>{' '}
                            {attributes?.sub}
                        </p>
                        <p>
                            <span className="font-semibold">メールアドレス:</span>{' '}
                            {attributes?.email}
                        </p>
                    </div>
                )}
            </div>
            <LogOutButton />
        </div>
    );
};

export default MyPage;
