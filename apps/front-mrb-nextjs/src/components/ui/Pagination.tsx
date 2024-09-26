'use client';

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import clsx from "clsx";
import { useState } from "react";

export default function Pagination({ totalPages }: Readonly<{ totalPages?: number }>) {

    const searchParams = useSearchParams()
    const pathname = usePathname()
    const [currPage, setCurrPage] = useState(1);
    const router = useRouter()
    const arr: unknown[] = [1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4]


    const setCurrentPage = (value: number) => {
        console.log(`search page... ${value + 1}`);
        setCurrPage(value + 1)
        const params = new URLSearchParams(searchParams)

        params.set('p', value.toString());
        router.replace(`${pathname}?${params}`)
    }
    return (
        <div className="">
            <h1>Pagination</h1>
            {
                arr.map((item, i) => {
                    return (
                        <button
                            key={i}
                            className={
                                clsx({
                                    'text-blue-600': i === (currPage - 1),
                                    'px-5': true
                                })

                            }
                            onClick={() => setCurrentPage(i)}> {(i + 1)}
                        </button>
                    )
                })
            }
        </div>
    );
}