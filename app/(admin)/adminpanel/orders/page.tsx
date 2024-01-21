import Breadcrumbs from "@/app/(admin)/adminpanel/components/Breadcrumbs";
import PageTitle from "@/app/(admin)/adminpanel/components/PageTitle";
import {LuShoppingBag} from "react-icons/lu";
import OrderTable from "./_components/OrderTable";

import { serverClient } from "@/app/_trpc/serverClient";
import { FullOrder } from "@/types/order";

const breadCrumbs = [
    {text: 'Главная', href: '/adminpanel'},
    {text: 'Заказы', href: '/adminpanel/orders'},
]

const Page = async () => {

    const orders = await serverClient.order.getOrders() as unknown as FullOrder

    return (
        <>
            <Breadcrumbs links={breadCrumbs} />

            <PageTitle
                title={'Заказы'}
                description={'Список всех заказов'}
                icon={<LuShoppingBag className={'text-3xl'}/>}
            >
            </PageTitle>
            <OrderTable orders={orders}/>
        </>
    );
};

export default Page;