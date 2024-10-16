'use client';

import { useFormStatus } from "react-dom";

export default function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <button type="submit"
            aria-disabled={pending}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        > {pending ? `In progress...` : `Book now`}</button>
    );
}