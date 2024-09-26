
export default function BookingTable({ page, query }: Readonly<{ page?: number; query?: string; }>) {
    return (
        <div>
            <h1>{`handle search booking service using these properties... page: ${page} & query: ${query}`}</h1>
        </div>
    );
}