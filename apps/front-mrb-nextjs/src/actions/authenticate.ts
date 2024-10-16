'use server';
import { signIn } from "@/auth";
import { getErrorMessage } from "@app/common/helpers/utils.helper";
import { AuthError } from "next-auth";

export type State = {
    errors?: {
        login?: string[];
        password?: string[];
    },
    message?: string | null;
};

export const authenticate = async (
    prevState: string | undefined,
    formData: FormData
) => {
    try {
        return await signIn('credentials', formData)
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return { error: 'Invalid credentials.' };
                default:
                    return { error: getErrorMessage(error) };
            }
        }
        throw error;
    }
};