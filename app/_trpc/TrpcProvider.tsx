"use client"
import React, {useState} from "react";
import {QueryClient} from "@tanstack/query-core";
import {trpc} from "@/app/_trpc/client";
import {httpBatchLink} from "@trpc/client";
import {TRPC_URL} from "@/config";
import {QueryClientProvider} from "@tanstack/react-query";

export default function TrpcProvider({children}: {children: React.ReactNode}) {
    const [queryClient] = useState(() => new QueryClient({}))
    const [trpcClient] = useState(() =>
        trpc.createClient({
            links: [
                httpBatchLink({
                    url: TRPC_URL
                })
            ]
        })
    )

    return (
        <trpc.Provider queryClient={queryClient} client={trpcClient}>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </trpc.Provider>
    )
}