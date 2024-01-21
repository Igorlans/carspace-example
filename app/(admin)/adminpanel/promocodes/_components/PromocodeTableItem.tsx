"use client"

import { FC } from 'react'

import {
    TableCell,
    TableRow,
} from "@/components/ui/table"
import { SinglePromocode } from '@/types/order';
import DeleteAlert from '../../components/DeleteAlert';
import { LuPencil } from 'react-icons/lu';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {trpc} from "@/app/_trpc/client";
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

interface PromocodeTableItemProps {
    promocode: SinglePromocode | undefined;
    number: number
}

const PromocodeTableItem: FC<PromocodeTableItemProps> = ({ promocode, number }) => {
    const router = useRouter();

    const statusMessages = {
        loading: "Видалення промокоду",
        success: "Промокод видалено",
        error: "Помилка"
    }
    const mutateOptions = {
        onMutate: () => {
            toast.loading(statusMessages.loading, {id: 'loading'})
        },
        onSuccess: () => {
            toast.success(statusMessages.success);
            router.refresh()
            
        },
        onSettled: () => {
            toast.dismiss('loading')
        },
        onError: () => {
            toast.error(statusMessages.error)
        }
    }
    const deletePromocode  = trpc.order.deletePromocode.useMutation(mutateOptions)
    const handleDelete = (id: string | undefined) => {
        if (id) {
            deletePromocode.mutate({
                id
            })
        }
    } 
    return (
        <TableRow>
            <TableCell className="font-medium">{number}</TableCell>
            <TableCell>{promocode?.code}</TableCell>
            <TableCell>{promocode?.value}{promocode?.type === "FIXED" ? "сум." : "%"}</TableCell>
            <TableCell>
                <div className='w-36 rounded-[4px] text-center text-white py-1 px-2'
                    style={{backgroundColor: promocode?.isActive ? "#9EB384" : "#CE5959"}}
                >
                    {
                        promocode?.isActive ?
                            <>Действительный</> : <>Недействительный</>
                    }
                </div>
            </TableCell>
            <TableCell className='flex gap-x-2 float-right'>
                <Link href={`/adminpanel/promocodes/${promocode?.id}`}>
                    <Button className='h-10 w-10 p-1'>
                        <LuPencil />
                    </Button>
                </Link>
                <DeleteAlert action={() => handleDelete(promocode?.id)}/>
            </TableCell>
        </TableRow>
    );
}

export default PromocodeTableItem