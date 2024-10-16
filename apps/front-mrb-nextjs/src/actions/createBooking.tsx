'use server';
import bookingService from "@/_services/booking.service";
import { z } from "zod";
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation";
import { getErrorMessage } from "@app/common/helpers/utils.helper";

export type State = {
    errors?: {
        guestEmails?: string[];
        roomId?: string[];
        userId?: string[];
        startTime?: string[];
        endTime?: string[];
    }
    message?: string | null;
};

export default async function book(prevState: State, formData: FormData) {
    console.log('start book func...');

    const guestEmails = formData.get('guestEmails')?.toString().split(',') as string[];
    console.log(formData);

    console.log({
        guestEmails,
        roomId: formData.get('roomId'),
        startTime: formData.get('start-time'),
        endTime: formData.get('end-time')
    });

    const schema = z.object({
        guestEmails: z.array(z.string({
            message: 'Please enter an emails'
        })/* .email({
            message: 'Please enter an emails'
        }) */),
        userId: z.string().min(1, 
            'Please enter userId'
        ),
        roomId: z.string().min(1,
            'Please enter roomId'
        ),
        startTime: z.date({
            message: 'Please enter a date'
        }),
        endTime: z.date({
            message: 'Please enter a date'
        })
    });

    const parse = schema.safeParse({
        guestEmails,
        userId: '_dev',
        roomId: formData.get('roomId')?.toString(),
        startTime: new Date(formData.get('start-time')?.toString()!),
        endTime: new Date(formData.get("end-time")?.toString()!),
    });

    console.log({
        parse
    });

    if (!parse.success) {
        return {
            errors: parse.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Book.',
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
            console.log('...pending: Booking');
            setTimeout(() => {
                console.log({
                    ...data
                });
            }, 2000);
        })
        revalidatePath("/booking/all");
        redirect("/booking/create")
    } catch (e: any) {
        return { error: getErrorMessage(e) };
    }
};