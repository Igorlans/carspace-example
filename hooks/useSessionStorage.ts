import { useEffect, useState } from 'react'

export function useSessionStorage<T>(key: string) {
    const [sessionValues, setSessionValues] = useState<T | null>(null)
    
    useEffect(() => {
        const sessionValues = sessionStorage.getItem(key)
        if (!sessionValues) return setSessionValues(null)
        setSessionValues(JSON.parse(sessionValues))
    }, [])

    const setStorageValues = (value: T) => {
        sessionStorage.setItem(key, JSON.stringify(value))
    }
    return {
        sessionValues,
        setStorageValues
    }
}