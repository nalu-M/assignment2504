import NavLinks from '@/app/_components/nav-links';

export default function Nav() {
    return (
        <header className="bg-gray-800 text-white fixed top-0 left-0 w-full h-12">
            <div className="mx-auto px-6 flex justify-end items-center h-full">
                <NavLinks />
            </div>
        </header>
    );
};