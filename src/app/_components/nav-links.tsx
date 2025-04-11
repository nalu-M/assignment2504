'use client';

import Link from '@/components/Link';
import { usePathname } from '@/hooks/use-pathname';

const navigations = [
    { id: 1, name: "ホーム", href: "/" },
    { id: 2, name: "リスト", href: "/app/list" },
    { id: 3, name: "マイページ", href: "/app/mypage" },
    { id: 4, name: "送信", href: "/app/form" },
    { id: 5, name: "ログイン", href: "/app/login" },
    { id: 6, name: "登録", href: "/app/signup" },
];

export default function NavLinks() {
    
    const pathname = usePathname();

    return (
        <ul className="flex space-x-6">
            {navigations.map((navigation) => {
                return (
                    <Link
                        key={navigation.name}
                        href={navigation.href}
                        className={pathname === navigation.href
                             ? "underline font-bold text-blue-400 hover:text-blue-500"
                             : "hover:text-gray-300"
                        }
                    >
                        {navigation.name}
                    </Link>
            
                );
            })}
        </ul>
    );
}