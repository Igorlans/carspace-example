import '../../globals.css'
import type {Metadata} from 'next'
import localFont from 'next/font/local'
import Header from '@/components/header/Header'
import Footer from '@/components/footer/Footer'
import {Toaster} from 'react-hot-toast'
import {NextIntlClientProvider, useLocale} from "next-intl";
import {notFound} from "next/navigation";
import Script from "next/script";
import Providers from "@/app/(client)/Providers";
import Head from "next/head";

const dela = localFont({
    src: [
        {
            path: "../../../public/font/dela/DelaGothicOne-Regular.woff2",
            weight: "400",
            style: "normal",
        }
    ],
    variable: "--font-dela",
})
const norms = localFont({
    src: [
        {
            path: "../../../public/font/ttNorms/TTNorms-Light.woff2",
            weight: "300",
            style: "normal",
        },
        {
            path: "../../../public/font/ttNorms/TTNorms-Regular.woff2",
            weight: "400",
            style: "normal",
        },
        {
            path: "../../../public/font/ttNorms/TTNorms-Bold.woff2",
            weight: "700"
        }
    ],
    variable: "--font-norms"
})

export const metadata: Metadata = {
    title: 'Carspace',
    description: 'CARSPACE - CARSPACE',
}

export async function generateStaticParams() {
    return ['ru', 'uz'].map((locale) => ({ locale }))
}

export default async function LocaleLayout({
                                               children,
                                               params
                                           }: {
    params: { locale: 'ru' | 'uz' };
    children: React.ReactNode
}) {

    let messages;
    try {
        messages = (await import(`../../../messages/${params.locale}.json`)).default;
    } catch (error) {
        notFound();
    }

    return (
        <html lang={params.locale}>

        <body className={`${dela.variable} ${norms.variable}`}>
        <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
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

        <NextIntlClientProvider locale={params.locale} messages={messages}>
            <Providers>
                <Header/>
                <main id='page_content'>
                    {children}
                </main>
                <Toaster/>
                <Footer/>
            </Providers>
        </NextIntlClientProvider>

        </body>
        </html>
    )
}
