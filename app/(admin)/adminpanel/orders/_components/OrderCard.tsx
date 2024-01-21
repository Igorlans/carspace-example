"use client"

import { FC } from 'react'

import Image from 'next/image'
import type { OrderItemValues, SingleOrder } from '@/types/order'

interface OrderCardProps {
    order: SingleOrder
    item: OrderItemValues
}

const OrderCard: FC<OrderCardProps> = ({ order, item }) => {
    if (!item || !order) return
    return (
            <div className="productCard select-none p-[12px] md:p-[20px] rounded-[8px] overflow-hidden bg-white">
                <div className='grid grid-cols-[220px_1fr] max-h-[220px] items-center gap-x-4 md:gap-x-11'>
                    <div className='relative w-full h-full rounded-[10px]  overflow-hidden aspect-square'>
                        <Image 
                            src={item.image.url}
                            fill={true}
                            style={{objectFit: 'cover'}}
                            className=""
                            alt={item.image.name!}
                        />
                    </div>

                    <div className='flex flex-col gap-y-2'>
                        <div className='flex items-center justify-between'>
                            <h1 className='font-dela uppercase text-xs md:text-lg'>{ item.title }</h1>
                        </div>
                        <div>
                            <div className='flex items-center gap-x-2 text-customSecondary max-w-[183px] text-xs md:text-sm'>
                                Имя:
                                <p>{ order.name }</p>
                            </div>
                            <div className='flex items-center gap-x-2 text-customSecondary max-w-[183px] text-xs md:text-sm'>
                                Телефон:
                                <p>{ order.phone }</p>
                            </div>
                        </div>
                        <div className='hidden md:flex items-center justify-between'>
                        <div className='w-20 flex items-center justify-between text-sm'>
                            <div className='flex gap-x-4'>
                                <span>Количество: </span>
                                { item.quantity }
                            </div>
                        </div>
                            <div className='font-norms flex flex-col items-center gap-x-4'>
                                <div className='font-bold text-lg text-customPrimary'>{
                                    parseFloat(item.price as string) * parseFloat(item.quantity as string)
                                } сум</div> 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
      )
}

export default OrderCard