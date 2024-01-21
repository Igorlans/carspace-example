import { FC } from 'react'
import Breadcrumbs from '../../components/Breadcrumbs'
import { serverClient } from '@/app/_trpc/serverClient'
import OrderCard from '../_components/OrderCard'
import { SingleOrder } from '@/types/order'
interface pageProps {
    params: {
        orderId: string
    }
}
const breadCrumbs = [
    {text: 'Главная', href: '/adminpanel'},
    {text: 'Заказы', href: '/adminpanel/orders'},
]

const page: FC<pageProps> = async ({ params }) => {
    const order = await serverClient.order.getOrderById({
        id: params.orderId
    }) as unknown as SingleOrder
    return (
        <div>
            <Breadcrumbs links={breadCrumbs} />
            
            <div className='flex flex-col gap-y-4'>
                {
                    order?.items.map(item => (
                        <OrderCard order={order!} item={item}  />
                    ))
                }
            </div>

            <div className='flex gap-x-4 items-center font-bold font-norms pt-11'>
                <span>Общая сумма заказа:</span>
                {order?.totalPrice} сум
            </div>
        </div>
    )
}

export default page