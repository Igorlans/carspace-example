"use client"

import { FC } from 'react'
import { useEffect, useState } from 'react'

interface ClientProviderProps {
    children: React.ReactNode
}

const ClientProvider: FC<ClientProviderProps> = ({ children }) => {
    const [isMounted, setIsMounted] = useState<boolean>(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if(!isMounted) return null
    return children
}

export default ClientProvider