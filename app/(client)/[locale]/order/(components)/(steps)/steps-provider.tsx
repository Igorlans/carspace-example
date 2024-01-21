import { FC } from 'react'
import { useContext } from 'react'

import OrderCard from '@/components/cards/OrderCard'
import { CartContext } from '@/providers/cart-provider'
import { cn } from '@/lib/utils'
import { useTranslations } from 'next-intl'

interface stepsProviderProps {
    children: React.ReactNode;
    className?: string;
}

const StepsProvider: FC<stepsProviderProps> = ({ children, className }) => {
    const cart = useContext(CartContext)
    const t = useTranslations("orderSummary")
    return (
        <div className={cn('sectionGap container', className)}>
            <div className='grid grid-cols-1 gap-y-11 md:grid-cols-[2fr_1.3fr] gap-x-11'>
                <div className='flex flex-col gap-y-4'>
                    {
                      cart?.orders &&
                        cart.orders.map(order => (
                          <OrderCard
                            key={order.variantId}
                            orderItem={order}
                          />
                        ))
                    }
                    <div className='productCard w-full rounded-[8px] p-[12px] md:p-[20px]'>
                        <div className='grid grid-cols-2 gap-y-1'
                            style={{"gridTemplateRows": cart?.promocode ? "3fr" : "1fr"}}
                        >
                            {
                                cart?.promocode &&
                                    <>
                                        <div className='text-xs md:text-base'>{t("promo")}:</div>
                                        <div className='text-xs md:text-base'>
                                            {
                                                cart?.promocode?.code
                                            }
                                        </div>

                                        <div className='text-xs md:text-base'>{t("sale")}:</div>
                                        <div className='text-xs md:text-base'>
                                            {
                                                cart?.promocode && cart.orders.length > 0 ?
                                                    (cart.orders.reduce((acc, item) => {
                                                        return acc + parseFloat(item.price as string) * parseFloat(item.quantity as string)
                                                    }, 0) - cart?.totalPrice).toLocaleString("ru") : 0
                                            } сум
                                        </div>
                                    </>
                            }


                            <div className='text-sm md:text-lg font-bold text-customPrimary'>{t("total")}:</div>
                            <div className='text-sm md:text-lg font-bold text-customPrimary'>
                                {
                                    cart?.totalPrice.toLocaleString("ru")
                                } сум
                            </div>
                        </div>
                    </div>
                </div>
                {
                    children
                }
            </div>
        </div>
    )
}

export default StepsProvider