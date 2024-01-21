"use client"

import React, { useState, useMemo, useEffect } from "react";
import { createContext } from "react"
import type { OrderItemValues } from "@/types/order";
import { $Enums } from "@prisma/client";

import { useSessionStorage } from "@/hooks/useSessionStorage";
import { useRouter } from 'next-intl/client';

export type Promocode = {
    type: $Enums.PromocodeType;
    value: number;
    code: string;
} | null;

export type OrderContextType = {
    orders: OrderItemValues[];
    totalPrice: number;
    promocode: Promocode;
    isCartOpen: boolean
    setCartOpen: (state: boolean) => void;
    setPromocode: (promocode: Promocode) => void;
    saveOrders: (order: OrderItemValues) => void;
    deleteOrder: (variantId: string) => void;
    setQuantity: (variantId: string, quantity: number) => void;
    getQuantity: (variantId: string) => number;
    resetCart: () => void
};


export const CartContext = createContext<OrderContextType | null>(null)

const CartProvider = ({children} : {children: React.ReactNode}) => {
    const { sessionValues, setStorageValues } = useSessionStorage<OrderItemValues[]>("session_orders");
    
    const [orders, setOrders] = useState<OrderItemValues[]>([])
    const [promocode, setPromocode] = useState<Promocode>(null)
    const [isCartOpen, setCartOpen] = useState<boolean>(false)

    const router = useRouter()

    useEffect(() => {
        if (sessionValues) setOrders(sessionValues)
    }, [sessionValues])

    const saveOrders = (newOrder: OrderItemValues) => {
        setOrders([...orders, newOrder])
        setStorageValues([...orders, newOrder])
    }
    const deleteOrder = (variantId: string) => {
        setOrders([...orders.filter(item => item.variantId !== variantId)])
        setStorageValues([...orders.filter(item => item.variantId !== variantId)])
        if (orders.length === 1) router.push("/")
    }
    const setQuantity = (variantId: string, quantity: number) => {
        const newOrder = orders.filter(item => item.variantId !== variantId)
        const itemId = orders.indexOf(orders.find(item => item.variantId === variantId)!)
        const newQuantity: OrderItemValues = {
            ...orders.find(item => item.variantId === variantId)!,
            quantity
        }
        
        setOrders([...newOrder.slice(0, itemId), newQuantity, ...newOrder.slice(itemId)])
        setStorageValues([newQuantity, ...newOrder])
    }
    const getQuantity = (variantId: string): number => {
        const quantity = orders.find(item => item.variantId === variantId)?.quantity
        if (quantity) return parseFloat(quantity as string)
        else return 1
    }

    const resetCart = () => {
        setOrders([])
        setStorageValues([])
        setPromocode(null)
    }

    const calculateTotalPrice = (promocode: Promocode): number => {
        const currentPrice = orders.reduce((acc, item) => {
            return acc + parseFloat(item.price.toString().replace(/\s/g,'') as string) * parseFloat(item.quantity.toString().replace(/\s/g,'') as string)
        }, 0)

        if (!promocode) return currentPrice

        switch (promocode.type) {
            case "FIXED":
                return currentPrice - promocode.value
            case "PERCENT":
                return currentPrice - (currentPrice * (promocode.value / 100))
        }
    }

    const totalPrice = useMemo(() => calculateTotalPrice(promocode), [orders, promocode])

    return <CartContext.Provider value={{
        orders,
        totalPrice,
        promocode,
        isCartOpen,
        setCartOpen,
        setPromocode,
        saveOrders,
        deleteOrder,
        setQuantity,
        getQuantity,
        resetCart
    }}>{ children }</CartContext.Provider>
}

export default CartProvider