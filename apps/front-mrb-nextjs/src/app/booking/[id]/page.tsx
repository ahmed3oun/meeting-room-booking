'use client';
import bookingService from "@/_services/booking.service";
import Body from "@/components/Layout/Body/Body";
import { IBooking } from "@app/common";
import { getErrorMessage } from "@app/common/helpers/utils.helper";
import toast from "react-hot-toast";

interface BookingPageProps {
    params: { id: string }; // Fetch the 'id' param from the dynamic route
  }

export default function BookingDetails({ params }: Readonly<BookingPageProps>) {
    let currentBook: IBooking | undefined;
    bookingService.findOne(params.id).then(book => {
        currentBook = book;
    }).catch(err => toast.error(getErrorMessage(err)))
    // try {
    //     currentBook = await bookingService.findOne(id);
    // } catch (error) {
    //     toast.error(getErrorMessage(error))
    //     // console.log(getErrorMessage(error));
    // }

    return (
        <Body>
            <h1>{`Booking Details id : ${params.id}`}</h1>
            {
                currentBook && (
                    <p>{currentBook?.id}</p>
                )
            }
        </Body>
    );
}