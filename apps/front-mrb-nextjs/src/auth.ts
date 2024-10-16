import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";
import { z } from 'zod';
import { IUser } from "@app/common";
// import userService from "./_services/user.service";

async function getUser(email: string): Promise<IUser | undefined> {
    try {
        //   const user = await userService.getMe();
        const user: IUser = {
            id: '1',
            email: 'test@test.com',
            name: 'test',
            password: "test",
            membership: "PREMIUM"
        };
        return user;
    } catch (error) {
        console.error('Failed to fetch user:', error);
        throw new Error('Failed to fetch user.');
    }
}


export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            async authorize(credentials): Promise<any> {
                const parsedCredentials = z.object({
                    login: z.string().email({
                        message: 'Please enter a valid email'
                    }),
                    password: z.string().min(6, 'Please enter at least 6 characters')
                }).safeParse(credentials)

                if (parsedCredentials.success) {
                    const { login, password } = parsedCredentials.data;
                    const user = await getUser(login);
                    if (!user) return null;
                    const passwordMatch = user.password === password;
                    if (passwordMatch) return user;
                } else {
                    return {
                        errors: parsedCredentials.error.flatten().fieldErrors,
                        message: 'Missing Fields. Failed to login.',
                    };
                }

                console.log('Invalid credentials...');
                return null;
            },
        })
    ]
});