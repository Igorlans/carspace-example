'use client'
import {SessionProvider, signOut} from "next-auth/react";
import React from "react";
import {Session} from "next-auth"
import TrpcProvider from "@/app/_trpc/TrpcProvider";

interface IProvidersProps {
    children: React.ReactNode
    session: Session | null
}
const Providers = ({children, session}: IProvidersProps) => {
    if (!session?.user?.isSuperUser) signOut({redirect: true})

    return (
        <TrpcProvider>
            <SessionProvider>
                {children}
            </SessionProvider>
        </TrpcProvider>

    );
};

export default Providers;