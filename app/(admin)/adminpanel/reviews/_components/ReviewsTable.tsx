"use client"

import { FC } from 'react'

import {
    Table,
    TableBody,
    TableCaption,
    TableHead,
    TableHeader,
    TableRow,
    TableCell
} from "@/components/ui/table"
import EmptyList from '../../components/EmptyList'

import { LuPencil } from 'react-icons/lu'
import RefreshOnMount from '@/helplers/RefreshOnMount'
import { RouterOutput, trpc } from '@/app/_trpc/client'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import DeleteAlert from '../../components/DeleteAlert'
import { $Enums } from '@prisma/client'
import dayjs from 'dayjs'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

interface ReviewsTableProps {
    reviews: RouterOutput["review"]["getReviews"]
}

const ReviewsTable: FC<ReviewsTableProps> = ({ reviews }) => {
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
    const deleteReview  = trpc.review.deleteReview.useMutation(mutateOptions)
    function handleDelete (id: string) {
        deleteReview.mutate({
            id: id
        })
    }
    
    return (
        <>
            <RefreshOnMount />
            <Table>
                <TableCaption>
                {
                    reviews?.length === 0 ?
                    <EmptyList message='Список отзывов пуст' /> : 
                    <>Список всех отзывов пуст</>
                }
                </TableCaption>
                <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">№</TableHead>
                    <TableHead>Имя</TableHead>
                    <TableHead>Товар</TableHead>
                    <TableHead>Статус</TableHead>
                    <TableHead>Дата</TableHead>
                    <TableHead className='text-right'>Редактировать</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        reviews?.map((item, i) => (
                            <TableRow key={item?.id}>
                                <TableCell className="font-medium">{i+1}</TableCell>
                                <TableCell>{item?.name}</TableCell>
                                <TableCell>{item?.Product?.variants[0].textFields_ru?.title}</TableCell>
                                <TableCell>
                                    <div className='w-32 rounded-[4px] text-center text-white py-1 px-2'
                                        style={
                                            {
                                                backgroundColor: item?.status === $Enums.ModerationStatus.ON_MODERATION ? 
                                                "#F4D160" :
                                                item?.status === $Enums.ModerationStatus.ALLOWED ? "#A8DF8E" : 
                                                "#C70039"
                                            }
                                        }
                                    >
                                        {
                                            item?.status === $Enums.ModerationStatus.ON_MODERATION ?
                                                <>На модерации</> : 
                                                item?.status === $Enums.ModerationStatus.ALLOWED ? 
                                                <>Активниый</> : <>Отклонен</>
                                        }
                                    </div>
                                </TableCell>
                                <TableCell>{dayjs(Number(item.createdAt)).format('DD.MM.YYYY')}</TableCell>
                                <TableCell className='flex gap-x-2 float-right'>
                                    <Link href={`/adminpanel/reviews/${item?.id}`}>
                                        <Button className='h-10 w-10 p-1'>
                                            <LuPencil />
                                        </Button>
                                    </Link>
                                    <DeleteAlert action={() => handleDelete(item?.id)}/>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>

            </Table>
        </>
  )
}

export default ReviewsTable