"use client"

import { FC } from 'react'
import PageTitle from '../../components/PageTitle'
import IconButton from '../../components/IconButton'
import { GoComment } from 'react-icons/go'
import { LuCheck, LuX } from "react-icons/lu"

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { RouterOutput } from '@/app/_trpc/client'

import FormInput from '@/components/ui/custom/FormInput'
import { Form } from '@/components/ui/form'

import FormTextarea from '@/components/ui/custom/FormTextarea'
import FormRating from '@/components/ui/custom/FormRating'
import FormCheckbox from '@/components/ui/custom/FormCheckbox'
import {PhotoProvider, PhotoView} from "react-photo-view";
import 'react-photo-view/dist/react-photo-view.css';

import { trpc } from '@/app/_trpc/client'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { $Enums } from '@prisma/client'

interface ReviewFormProps {
    review: RouterOutput["review"]["getSingleReview"]
}

const reviewSchema = z.object({
    productName: z.string(),
    name: z.string(),
    email: z.string(),
    phone: z.string(),
    comment: z.string(),
    rating: z.number(),
    isPublic: z.boolean(),
})

type reviewValues = z.infer<typeof reviewSchema>

const ReviewForm: FC<ReviewFormProps> = ({ review }) => {
    if (!review) return
    const router = useRouter()

    const files = [review?.file, review?.file2, review?.file3].filter(item => item && item.length > 0)

    const defaultValues: reviewValues = {
        productName: review?.Product?.variants[0].textFields_ru?.title ?? "",
        name: review?.name,
        email: review?.email ?? "Не указан",
        phone: review?.phone ?? "Не указан",
        comment: review?.comment,
        rating: review?.rating,
        isPublic: review?.isPublic
    }

    const form = useForm<reviewValues>({
        resolver: zodResolver(reviewSchema),
        defaultValues,
        mode: "onBlur"
    })

    const statusMessages = {
        loading: "Модерация отзыва",
        success: "Модерация отзыва прошла успешно",
        error: "Помилка"
    }
    const mutateOptions = {
        onMutate: () => {
            toast.loading(statusMessages.loading, {id: 'loading'})
        },
        onSuccess: () => {
            toast.success(statusMessages.success)
            router.push('/adminpanel/reviews/')
        },
        onSettled: () => {
            toast.dismiss('loading')
        },
        onError: () => {
            toast.error(statusMessages.error)
        }
    }

    const moderateReview = trpc.review.setModerationStatus.useMutation(mutateOptions)

    function setModerationStatus (status: $Enums.ModerationStatus) {
        if (review?.id && status) {
            moderateReview.mutate({
                id: review?.id,
                status
            })
        }
    }

    return (
        <div>
            <PageTitle
                title={'Отзывы'}
                description={'Модерация отзыва'}
                icon={<GoComment className={'text-3xl'}/>}
            >
                <div className='flex gap-x-2'>
                    <IconButton
                        onClick={() => setModerationStatus("ALLOWED")}
                        icon={<LuCheck className={'text-base'} />}
                    >
                        Принять
                    </IconButton>
                    <IconButton
                        onClick={() => setModerationStatus("REJECTED")}
                        variant="destructive"
                        icon={<LuX className={'text-base'} />}
                    >
                        Отклонить
                    </IconButton>
                </div>
            </PageTitle>

            <div className='pt-6'>
                <Form {...form}>
                    <div className='grid grid-cols-2 gap-x-4'>
                        <div className='flex flex-col gap-y-4'>
                            <div className='flex flex-col gap-y-4 pointer-events-none'>
                                <h1 className='text-primary font-semibold text-lg pt-4'>Пользователь</h1>
                                <FormInput
                                    name="name"
                                    control={form.control}
                                    label='Имя'
                                />
                                <FormInput
                                    name="email"
                                    control={form.control}
                                    label='Email'
                                />
                                <FormInput
                                    name="phone"
                                    control={form.control}
                                    label='Номер телефона'
                                />
                                <FormTextarea
                                    name="comment"
                                    control={form.control}
                                    label='Коментарий'
                                />
                                <FormRating 
                                    name="rating"
                                    variant="product"
                                    control={form.control}
                                    label='Оценка'
                                />
                                <FormCheckbox 
                                    name="isPublic"
                                    control={form.control}
                                    label='Публичный отзыв'
                                    description={
                                        `Даный пользователь ${form.getValues("isPublic") == false ? "не" : ""} хочет публиковать отзыв`
                                    }
                                />
                            </div>
                            <div className='min-h-[200px] p-2 border-[1px] rounded-md h-fit'>
                                {
                                    files && files.length > 0 ?
                                        <div className={'flex items-center flex-wrap gap-4'}>
                                            <PhotoProvider>
                                                {
                                                    files?.map((item, index) => (
                                                        <PhotoView key={index} src={item as string | undefined}>
                                                            <img src={item as string | undefined} alt=""
                                                                 className={'w-[200px] h-[200px] rounded cursor-pointer'}/>
                                                        </PhotoView>
                                                ))}
                                            </PhotoProvider>
                                        </div>
                                        :
                                        <div className='text-center text-customSecondary select-none w-full'>Картинок нет</div>
                                }
                            </div>
                        </div>
                        <div className='pointer-events-none'>
                            <h1 className='text-primary font-semibold text-lg pt-8'>Товар</h1>
                            <FormInput
                                name="productName"
                                control={form.control}
                                label='Название товара'
                            />
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default ReviewForm