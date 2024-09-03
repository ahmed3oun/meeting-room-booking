import type { ReactNode } from 'react';

type LayoutProps = {
    children: ReactNode;
};

export default function Body({ children }: Readonly<LayoutProps>) {

    return (
        <section className="flex min-h-screen flex-col items-center justify-between p-24">
            {children}
        </section>
    );
}
