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
import ProductTableItem from "@/app/(admin)/adminpanel/products/_components/ProductTableItem";
import RefreshOnMount from "@/helplers/RefreshOnMount";
import {RouterOutput} from "@/app/_trpc/client";

interface CategoryTableProps {
    products: RouterOutput['product']['getAllProducts']
}

const ProductTable: FC<CategoryTableProps> = ({ products }) => {

    return (
        <>
            <RefreshOnMount />
            <Table>
                <TableCaption>
                    {
                        products?.products.length === 0 ?
                            <EmptyList message='Список категорий пуст' /> :
                            <>Список усіх продуктів</>
                    }
                </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">№</TableHead>
                        <TableHead>Изображение</TableHead>
                        <TableHead>Название</TableHead>
                        <TableHead>Подзаголовок</TableHead>
                        <TableHead>Категория</TableHead>
                        <TableHead className='text-right'>Редактировать</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        products?.products?.map((item, i) => (
                            <ProductTableItem key={i} product={item} number={i+1} />
                        ))
                    }
                </TableBody>

            </Table>
        </>

    )
}

export default ProductTable