'use client';
import book, { State } from "@/actions/createBooking";
import SubmitButton from "./SubmitButton";
import { useFormState } from "react-dom";
import toast from "react-hot-toast";
import { useEffect } from "react";



export default function BookingForm() {
    const initialState: State = { message: null, errors: {} };
    const [state, formAction] = useFormState<any>(book, initialState);

    useEffect(() => {
        if (state.message)
            toast.error(state.message)
    }, [state]);
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Book a meeting room</h1>
                <form action={formAction} className="space-y-6">
                    <div>
                        <label htmlFor="guestEmails">Guest Emails...</label>
                        <input id="guestEmails" name="guestEmails"
                            type="text"
                            aria-describedby="guestEmails-error"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            /* required */ />
                    </div>
                    <div id="guestEmails-error" aria-live="polite" aria-atomic="true">
                        {
                            state.errors?.guestEmails &&
                            state.errors.guestEmails?.map((error: string) => (
                                <p className="mt-2 text-sm text-red-500" key={error}>
                                    {error}
                                </p>
                            ))
                        }
                    </div>
                    <div>
                        <label htmlFor="roomId">Room ID</label>
                        <input id="roomId" name="roomId"
                            aria-describedby="roomId-error"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            /* required */ />
                    </div>
                    <div id="roomId-error" aria-live="polite" aria-atomic="true">
                        {
                            state.errors?.roomId &&
                            state.errors.roomId?.map((error: string) => (
                                <p className="mt-2 text-sm text-red-500" key={error}>
                                    {error}
                                </p>
                            ))
                        }
                    </div>
                    {/* Start Time Field */}
                    <div>
                        <label htmlFor="start-time" className="block text-sm font-medium text-gray-700 mb-2">
                            Start Time
                        </label>
                        <input
                            id="start-time"
                            name="start-time"
                            type="datetime-local"
                            aria-describedby="start-time-error"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        /* required */
                        />
                    </div>
                    <div id="start-time-error" aria-live="polite" aria-atomic="true">
                        {
                            state.errors?.startTime &&
                            state.errors.startTime?.map((error: string) => (
                                <p className="mt-2 text-sm text-red-500" key={error}>
                                    {error}
                                </p>
                            ))
                        }
                    </div>
                    {/* End Time Field */}
                    <div>
                        <label htmlFor="end-time" className="block text-sm font-medium text-gray-700 mb-2">
                            End Time
                        </label>
                        <input
                            id="end-time"
                            name="end-time"
                            type="datetime-local"
                            aria-describedby="end-time-error"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        /* required */
                        />
                    </div>
                    <div id="start-time-error" aria-live="polite" aria-atomic="true">
                        {
                            state.errors?.startTime &&
                            state.errors.startTime?.map((error: string) => (
                                <p className="mt-2 text-sm text-red-500" key={error}>
                                    {error}
                                </p>
                            ))
                        }
                    </div>
                    <SubmitButton />
                </form>
            </div>
        </div>
    );
}