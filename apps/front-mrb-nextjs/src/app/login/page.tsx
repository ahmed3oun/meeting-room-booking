'use client';

import Body from "@/components/Layout/Body/Body";
import LoginForm from "@/components/ui/LoginForm";

export default function Login() {
    return (
        <Body>
            <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
                <LoginForm />
            </div>
        </Body>

    );
}