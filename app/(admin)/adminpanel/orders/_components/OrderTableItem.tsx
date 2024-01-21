'use client'

import React, {FC} from 'react';
import {TableCell, TableRow} from "@/components/ui/table";
import { useRouter } from 'next/navigation';
import type { FullOrder } from '@/types/order';

interface ProductTableItemProps {
    order: FullOrder[number]
    number: number
}

const OrderTableItem: FC<ProductTableItemProps> = ({order, number}) => {
    const router = useRouter()
    return (
        <TableRow
            onClick={() => router.push(`/adminpanel/orders/${order.id}`)}
        >
            <TableCell className="font-medium">{number}</TableCell>
            <TableCell>{order?.name}</TableCell>
            <TableCell>{order?.phone}</TableCell>
            <TableCell>{new Date(order?.createdAt).toLocaleDateString()}</TableCell>
            <TableCell>{new Date(order?.createdAt).toLocaleTimeString()}</TableCell>
            <TableCell>{order?.totalPrice} сум</TableCell>
            <TableCell>
                {
                    order?.promocode ? 
                        <>{order?.promocode}</> :
                        <>—</>
                }
            </TableCell>
        </TableRow>
    );
};

export default OrderTableItem;