"use client"

import { FC } from 'react'

import {
    Table,
    TableBody,
    TableCaption,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import EmptyList from '../../components/EmptyList'

import { FullPromocode } from '@/types/order'
import PromocodeTableItem from './PromocodeTableItem'
import RefreshOnMount from '@/helplers/RefreshOnMount'
interface PromocodesTableProps {
    promocodes: FullPromocode
}

const PromocodesTable: FC<PromocodesTableProps> = ({ promocodes }) => {
    return (
        <>
            <RefreshOnMount />
            <Table>
                <TableCaption>
                {
                    promocodes?.length === 0 ?
                    <EmptyList message='Список промокодов пуст' /> : 
                    <>Список усіх промокодів</>
                }
                </TableCaption>
                <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">№</TableHead>
                    <TableHead>Промокод</TableHead>
                    <TableHead>Размер скидки</TableHead>
                    <TableHead>Статус</TableHead>
                    <TableHead className='text-right'>Редактировать</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        promocodes?.map((item, i) => (
                            <PromocodeTableItem promocode={item} number={i+1}/>
                        ))
                    }
                </TableBody>

            </Table>
        </>
  )
}

export default PromocodesTable