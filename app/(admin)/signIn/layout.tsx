import '@/app/globals.css'
import {Montserrat} from 'next/font/google'
import {getServerSession} from "next-auth";
import {authOptions} from "@/lib/auth";
import {redirect} from "next/navigation";
import {Toaster} from "react-hot-toast";
import NextTopLoader from "nextjs-toploader";

const montserrat = Montserrat({subsets: ['latin']})

export const metadata = {
    title: 'WinB Admin',
    description: 'Woman in business',
}

interface IRootLayoutProps {
    children: React.ReactNode
}

export default async function RootLayout({children}: IRootLayoutProps) {
    const session = await getServerSession(authOptions);

    if (session) {
        redirect('/adminpanel')
    }

    return (
        <html lang={'uk'}>
        <body className={montserrat.className}>
        <NextTopLoader
            color={'hsla(226,25%,23%,1)'}
            initialPosition={0.08}
            crawlSpeed={200}
            height={5}
            crawl={true}
            showSpinner={true}
            easing="ease"
            speed={200}
            shadow="0 0 10px #2299DD,0 0 5px #2299DD"
        />
        <Toaster/>
        <main>{children}</main>
        </body>
        </html>
    );
}
