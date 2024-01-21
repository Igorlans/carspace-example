import {FC} from 'react'

import {
    Table,
    TableBody,
    TableCaption,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import EmptyList from '../../components/EmptyList'
import OrderTableItem from './OrderTableItem';
import RefreshOnMount from "@/helplers/RefreshOnMount";
import type { FullOrder } from '@/types/order';

interface CategoryTableProps {
    orders: FullOrder
}

const OrderTable: FC<CategoryTableProps> = ({ orders }) => {

    return (
        <>
            <RefreshOnMount />
            <Table>
                <TableCaption>
                    {
                        orders?.length === 0 ?
                            <EmptyList message='Список категорий пуст' /> :
                            <>Список всех товаров</>
                    }
                </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">№</TableHead>
                        <TableHead>Имя</TableHead>
                        <TableHead>Телефон</TableHead>
                        <TableHead>Дата</TableHead>
                        <TableHead>Время</TableHead>
                        <TableHead>Сумма заказа</TableHead>
                        <TableHead>Промокод</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        orders?.map((item, i) => (
                            <OrderTableItem key={i} order={item} number={i+1} />
                        ))
                    }
                </TableBody>

            </Table>
        </>

    )
}

export default OrderTable