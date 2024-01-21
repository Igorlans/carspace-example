'use client'

import React, {FC} from 'react';
import {TableCell, TableRow} from "@/components/ui/table";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import DeleteAlert from "@/app/(admin)/adminpanel/components/DeleteAlert";
import {RouterOutput, trpc} from "@/app/_trpc/client";
import {toast} from "react-hot-toast";
import {useRouter} from "next/navigation";
import Image from 'next/image';
import { FullProduct } from '@/types/product';

interface ProductTableItemProps {
    product: FullProduct,
    number: number
}

const ProductTableItem: FC<ProductTableItemProps> = ({product, number}) => {
    const router = useRouter()
    const deleteProduct = trpc.product.deleteProduct.useMutation()

    const handleDelete = () => {
        toast.loading('Удаление продукта...', {id: 'loading'})
        deleteProduct.mutate(product.id, {
            onSuccess: () => {
                toast.dismiss('loading')
                toast.success('Продукт удален')
                router.refresh()
            },
            onError: () => {
                toast.error('Ошибка удаления продукта')
            }
        })
    }

    return (
        <TableRow>
            <TableCell className="font-medium">{number}</TableCell>
            <TableCell>
                <div className="relative w-[200px] h-[200px] rounded-md overflow-hidden">
                    <Image
                        fill
                        className="object-cover"
                        alt={product?.images[0]?.name ?? "Товар"}
                        src={product?.images[0]?.url}
                    />
                </div>
            </TableCell>
            <TableCell>{product.variants[0]?.title}</TableCell>
            <TableCell>{product.variants[0]?.subtitle}</TableCell>
            <TableCell>{product.category.title}</TableCell>
            <TableCell className='flex gap-x-2 float-right'>
                <Link href={`/adminpanel/products/${product.id}/uz`}>
                    <Button className='h-10 w-10 p-1'>
                        UZ
                    </Button>
                </Link>
                <Link href={`/adminpanel/products/${product.id}/ru`}>
                    <Button className='h-10 w-10 p-1'>
                        RU
                    </Button>
                </Link>
                <DeleteAlert action={handleDelete}/>
            </TableCell>
        </TableRow>
    );
};

export default ProductTableItem;