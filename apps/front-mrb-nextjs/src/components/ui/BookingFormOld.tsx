'use client';

import { BookingReqDTO } from "@app/common";
import { ChangeEvent, useState } from "react";
import SubmitButton from "./SubmitButton";
import bookingService from "@/_services/booking.service";

export default function BookingFormOld() {

    const submit = () => {
        bookingService.create({
            guestsEmails: formData.guestsEmails!,
            roomId: formData.roomId!,
            confirmed: false,
            startTime: formData.startTime!,
            endTime: formData.endTime!
        } as BookingReqDTO)
    }

    const [formData, setFormData] = useState<Partial<BookingReqDTO>>({
        confirmed: false,
    });
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Book a meeting room</h1>
                <form onSubmit={submit} className="space-y-6">
                    <div>
                        <label htmlFor="guestEmails">Guest Emails...</label>
                        <input id="guestEmails" name="guestEmails"
                            type="text"
                            value={formData.guestsEmails?.join(',')}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({
                                ...formData, guestsEmails: e.target.value.split(',').map(email => email.trim())
                            })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required />
                    </div>
                    <div>
                        <label htmlFor="roomId">Room ID</label>
                        <input id="roomId" name="roomId"
                            value={formData.roomId || ''}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, roomId: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required />
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
                            value={formData.startTime?.toString()}
                            onChange={(e) => setFormData({
                                ...formData,
                                startTime: new Date(e.target.value)
                            })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
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
                            value={formData.endTime?.toString()}
                            onChange={(e) => setFormData({
                                ...formData,
                                endTime: new Date(e.target.value)
                            })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <SubmitButton />
                    {/* <p aria-live="polite" className="sr-only" role="status">
                            {state?.message}
                        </p> */}
                </form>
            </div>
        </div>
    );
}