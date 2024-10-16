'use client';

import  { State } from "@/actions/authenticate";
import SubmitButton from "./SubmitButton";
import { useActionState, useEffect } from "react";
import toast from "react-hot-toast";
import { authenticate } from "@/actions/authenticate";

export default function LoginForm() {

    const initialState: State = { message: null, errors: {} };
    const [errorMessage, formAction, isPending] = useActionState(authenticate,undefined)
    useEffect(() => {
        if (errorMessage?.error)
            toast.error(errorMessage.error)
    }, [errorMessage]);
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Login</h1>
                <form action={formAction} className="space-y-6">
                    <div>
                        <label htmlFor="guestEmails">Login</label>
                        <input id="login" name="login"
                            type="email"
                            aria-describedby="login-error"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter password"
                            minLength={6}
                            required />
                    </div>
                    <div>
                        <label htmlFor="roomId">Password</label>
                        <input id="password" name="password"
                            type="password"
                            aria-describedby="password-error"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required />
                    </div>
                    <SubmitButton />
                </form>
            </div>
        </div>
    );
}