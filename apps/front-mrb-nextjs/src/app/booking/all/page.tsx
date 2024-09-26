// 'use client';

import Loading from "@/app/rooms/(overview)/loading";
import Body from "@/components/Layout/Body/Body";
import BookingTable from "@/components/ui/BookingTable";
import Pagination from "@/components/ui/Pagination";
import Search from "@/components/ui/search";
import { Suspense } from "react";

export default async function AllBooking({ searchParams }: Readonly<{
    searchParams?: { q?: string; p?: string; }
}>) {
    const query: string = searchParams?.q || '';
    const page = Number(searchParams?.p) || 1

    return (
        <Body>
            <h1>Find Bookings</h1>
            <Search placeholder="Search booking..." />
            <Suspense key={query + page} fallback={<Loading />} >
                <BookingTable query={query} page={page} />
            </Suspense>
            <Pagination />
        </Body>
    );
}