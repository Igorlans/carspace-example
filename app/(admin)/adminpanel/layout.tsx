import '@/app/globals.css'
import {Montserrat} from 'next/font/google'
import Providers from "@/app/(admin)/adminpanel/Providers";
import {getServerSession} from "next-auth";
import {authOptions} from "@/lib/auth";
import {redirect} from "next/navigation";
import {Toaster} from "react-hot-toast";
import Header from "@/app/(admin)/adminpanel/components/Header";
import NextTopLoader from "nextjs-toploader";
import Head from "next/head";
import Script from "next/script";

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

    if (!session) {
        redirect('/signIn?callbackUrl=/adminpanel')
    }

    return (
        <html lang={'uk'} className={'text-[14px] md:text-[16px]'}>
        <body className={montserrat.className}>
        <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"/>
        </Head>
        <Script id="google-analytics" strategy="afterInteractive">
            {`
                    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                    })(window,document,'script','dataLayer','GTM-MPQ83FKM');
                `}
        </Script>
        <noscript
            dangerouslySetInnerHTML={{
                __html:
                    `<iframe 
                src="https://www.googletagmanager.com/ns.html?id=GTM-MPQ83FKM"
                height="0"
                width="0"
                style="display:none;visibility:hidden"
          ></iframe>`
            }}></noscript>

        <Providers session={session}>
            <Toaster/>
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
            <div className={'max-w-[1400px] p-3 w-full mx-auto'}>
                <Header/>
                <main className={'m-0 p-3 pt-8 relative'}>{children}</main>
            </div>
        </Providers>
        </body>
        </html>
    );
}
