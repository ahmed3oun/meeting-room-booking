'use server';
import userService from "@/_services/user.service";
import { z } from "zod";
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation";
import { getErrorMessage } from "@app/common/helpers/utils.helper";

export type State = {
    errors?: {
        login?: string[];
        password?: string[];
    },
    message?: string | null;
};

export default async function login(prevState: State, formData: FormData) {
    console.log('start login func...');
    console.log(formData);

    console.log({
        login: formData.get('login'),
        password: formData.get('password'),
    });

    const schema = z.object({
        login: z.string().email({
            message: 'Please enter a valid email'
        }),
        password: z.string().min(6, 'Please enter at least 6 characters'),
    });

    const parse = schema.safeParse({
        login: formData.get('login'),
        password: formData.get('password')
    });

    console.log({
        parse
    });

    if (!parse.success) {
        return {
            errors: parse.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to login.',
        };
    }

    const data = parse.data;

    try {
        // const response = await bookingService.create({
        //     userId: data.userId,
        //     roomId: data.roomId,
        //     guestsEmails: data.guestEmails,
        //     startTime: data.startTime,
        //     endTime: data.endTime,
        //     confirmed: false
        // });
        // throw new Error('Something gone wrong');
        await new Promise((resolve, reject) => {
            console.log('...pending: Login');
            setTimeout(() => {
                console.log({
                    ...data
                });

            }, 2000);
        });
        revalidatePath("/login");
        return {
            message: "Logged in successfully"
        }
        // redirect("/login")

    } catch (e: any) {
        return { error: getErrorMessage(e) };
    }
};