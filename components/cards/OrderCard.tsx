"use client"

import { FC, useEffect } from 'react'
import { useState, useContext } from 'react'

import Image from 'next/image'
import DiscountDecor from '../ui/custom/DiscountDecor';
import { CartContext } from '@/providers/cart-provider';
import DeleteAlert from '../ui/custom/DeleteAlert';
import { 
    LuPlus,
    LuMinus
} from 'react-icons/lu';
import { cn } from '@/lib/utils'
import { OrderItemValues } from '@/types/order';
import {gtmService} from "@/services/gtm/gtmService";

interface OrderCardProps {
  orderItem: OrderItemValues;
}

const OrderCard: FC<OrderCardProps> = ({ orderItem }) => {
    const cart = useContext(CartContext)
    const [count, setCount] = useState<number>(cart?.getQuantity(orderItem?.variantId!)!)

    useEffect(() => {
        cart?.setQuantity(orderItem?.variantId!, count)
    }, [count])

    return (
        // <Link href={link}>
            <div className="productCard select-none p-[12px] md:p-[20px] rounded-[8px] overflow-hidden bg-white">
                <div className='grid grid-cols-[1fr_2fr] items-center gap-x-4 md:gap-x-11'>
                    <div className='md:aspect-square relative w-[100px] h-[100px] md:w-full md:h-full rounded-[10px] overflow-hidden shrink-0'>
                    {
                            orderItem?.oldPrice ?
                                <DiscountDecor 
                                    className='text-sm'
                                    discount={`-${
                                        ((parseFloat(orderItem.oldPrice as string) - (parseFloat(orderItem?.price as string))) * 100 / parseFloat(orderItem.oldPrice as string)).toFixed(0)
                                    }%`}
                                /> :
                            orderItem.onFresh ?
                                <DiscountDecor 
                                    className='text-sm'
                                    discount="Новинка"
                                /> :
                            orderItem.onBestsellers ?
                                <DiscountDecor 
                                    className='text-sm'
                                    discount="Хит"
                                /> : null
                        }
                        <Image 
                            src={orderItem.image?.url}
                            fill={true}
                            style={{objectFit: 'cover'}}
                            className=''
                            alt='product'
                        />
                    </div>

                    <div className='flex flex-col gap-y-2'>
                        <div className='flex items-center justify-between'>
                            <h1 className='font-dela uppercase text-xs md:text-lg'>{ orderItem?.title }</h1>
                            <DeleteAlert action={() => {
                                cart?.deleteOrder(orderItem?.variantId!)
                                gtmService.removeFromCart(orderItem)
                            }} />
                        </div>
                        <div className='text-xs md:text-base'>
                            {orderItem?.subtitle}
                        </div>
                        <div className='hidden md:flex items-center justify-between'>
                            <div className='border-customPrimary border px-2 py-1 w-20 flex items-center justify-between text-sm'>
                                <div onClick={() => setCount(state => {
                                    if (state === 1) return state
                                    return state - 1
                                })}>
                                    <LuMinus className={cn("cursor-pointer", count === 1 && "opacity-40")}/>
                                </div>
                                <div>{ count }</div>
                                <div onClick={() => setCount(state => state + 1)}>
                                    <LuPlus  className=" cursor-pointer"/>
                                </div>
                                
                            </div>
                            <div className='font-norms flex flex-col items-center gap-x-4'>
                                {
                                    orderItem?.oldPrice &&
                                        <div className='font-bold text-sm text-lightGray line-through'>{(parseFloat(orderItem.oldPrice as string) * count).toLocaleString("ru")} сум</div>
                                }
                                <div className='font-bold text-lg text-customPrimary'>
                                {
                                    (parseFloat(cart?.orders.find(item => item.variantId === orderItem?.variantId)?.price as string) * count).toLocaleString("ru")
                                } сум</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex md:hidden items-center justify-between pt-4'>
                        <div className='border-customPrimary border px-2 py-1 w-20 flex items-center justify-between text-sm'>
                            <div onClick={() => setCount(state => {
                                if (state === 1) return state
                                return state - 1
                            })}>
                                <LuMinus className={cn("cursor-pointer", count === 1 && "opacity-40")}/>
                            </div>
                            <div>{ count }</div>
                            <div onClick={() => setCount(state => state + 1)}>
                                <LuPlus  className=" cursor-pointer"/>
                            </div>
                        </div>
                        <div className='font-norms flex flex-col items-center gap-x-4'>
                            {
                                orderItem?.oldPrice &&
                                    <div className='font-bold text-sm text-lightGray line-through'>{(parseFloat(orderItem.oldPrice as string) * count).toLocaleString("ru")} сум</div>
                            }
                            <div className='font-bold text-sm text-customPrimary'>{
                                    (parseFloat(cart?.orders.find(item => item.variantId === orderItem?.variantId)?.price.toString().replace(/\s/g,'') as string) * count).toLocaleString("ru")
                            } сум</div>
                        </div>
                </div>
            </div>  
        // </Link>
      )
}

export default OrderCard