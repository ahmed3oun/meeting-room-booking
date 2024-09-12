// 'use client';

import roomService from "@/_services/room.service";
import Body from "@/components/Layout/Body/Body";
import { Suspense, /* useEffect, useState */ } from "react";
import { IRoom } from '@app/common';
import Loading from "./loading";



export default async function Rooms() {

    /* const [rooms, setRooms] = useState<IRoom[] | undefined>();
    useEffect(() => {
        try {
            roomService.findAll({}).then(res => {
                setRooms(res)
            })
        } catch (error: any) {
            console.log(error);
            alert(error.respponse)
        }
    }, []); */
    const rooms = await roomService.findAll({})
    return (
        <Body>
            <Suspense fallback={<Loading />}>
                <span>Spaces</span>
                {
                    rooms?.map((room: IRoom) => (
                        <>
                            <div className="title">{room.name}</div>
                            <div className="size">{room.size}</div>
                            <div className="title">{room.premium}</div>
                        </>
                    ))
                }
            </Suspense>
        </Body>
    );
}