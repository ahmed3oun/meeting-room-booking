import '@/app/globals.css';
import Header from '@/components/Layout/Header';
import { Inter, Lusitana } from 'next/font/google'

const inter = Inter({
  subsets: ['latin']
})

/* const lusitana = Lusitana({
  weight: "700"
}) */

/**
 * Using force dynamic so changes in business assets (e.g. services) are immediately reflected.
 * If you prefer having it reflected only after redeploy (not recommended) please remove it
 * **/

// export const experimental_ppr = true;

export default function RootLayout(
  layoutProps: Readonly<{
    children: React.ReactNode;
  }>
) {
  const { children } = layoutProps;
  return (
    <html lang="en">
      <head>
        <title>Meeting Room Booking</title>
        <meta
          name="description"
          content="Booking a meeting room for your team"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>

      <body className={`${inter.className} antialiased`}>
        <Header />
        <main className="bg-transparent min-h-[600px]">{children}</main>
      </body>
    </html>
  );
}

