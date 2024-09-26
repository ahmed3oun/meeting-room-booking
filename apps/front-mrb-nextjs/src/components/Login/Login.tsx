'use client';
type LoginProps = {
    onActionClick: (isLoggedIn: boolean) => void;
};
import authService from "@/_services/auth.service";
import Loading from "@/app/rooms/(overview)/loading";
import { useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

export default function Login({ onActionClick }: Readonly<LoginProps>) {

    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    useEffect(() => {
        const token: string | null = localStorage.getItem('token')
        setIsLoggedIn(!!token);
    }, []);

    const router = useRouter();
    const onLoginClick = async () => {
        onActionClick(isLoggedIn);
        if (isLoggedIn) {
            authService.logout();
            router.push("/")
        } else {
            router.replace('/login')
        }
    };
    return (
        <Suspense fallback={<Loading />}>
            <button
                onClick={onLoginClick}
                className="flex flex-nowrap text-highlight gap-2 justify-center items-center font-open-sans-condensed"
            >
                <div className="w-[22px] h-[22px] fill-highlight">
                    {/* <MemberAvatar /> */}<h1 className="">MemberAvatar</h1>
                </div>
                <div className="flex relative whitespace-nowrap">
                    {isLoggedIn ? 'Log Out' : 'Log In'}
                </div>
            </button>
        </Suspense>
    );
}