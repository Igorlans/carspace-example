'use client';

import {ReactNode, Suspense} from "react";
import CartProvider from "@/providers/cart-provider";
import TrpcProvider from "@/app/_trpc/TrpcProvider";
import NextTopLoader from "nextjs-toploader";

const Providers = ({children}: { children: ReactNode }) => {
    return (
        <>
            <TrpcProvider>
                <CartProvider>
                    <Suspense fallback={null}>
                        <NextTopLoader
                            color={'hsla(226,25%,23%,1)'}
                            initialPosition={0.08}
                            crawlSpeed={200}
                            crawl={true}
                            showSpinner={true}
                            easing="ease"
                            speed={200}
                            shadow="0 0 10px #2299DD,0 0 5px #2299DD"
                            height={5}
                        />
                    </Suspense>
                    {children}
                </CartProvider>
            </TrpcProvider>
        </>
    );
};

export default Providers;