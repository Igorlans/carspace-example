"use client"

import { FC } from 'react'

import PageTitle from '../components/PageTitle'
import IconButton from '../components/IconButton'
import { Button } from '@/components/ui/button'
import {LuTicket} from "react-icons/lu"
import { BiSave } from 'react-icons/bi'
import { LuX } from 'react-icons/lu'

import ClientProvider from '@/providers/client-provider'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { promocodeSchema } from '@/types/order'
import type { PromocodeSchemaValue, SinglePromocode } from '@/types/order'
import {trpc} from "@/app/_trpc/client";

import UIForm from './_components/UIForm'

interface PromocodeFormProps {
    promocode?: SinglePromocode
}

const PromocodeForm: FC<PromocodeFormProps> = ({ promocode }) => {
    const router = useRouter()
    const isUpdate = !!promocode

    const initialValues: PromocodeSchemaValue = {
        type: "FIXED",
        code: "",
        value: 0,
        isActive: true
    }
    const defaultValues: PromocodeSchemaValue = isUpdate ? {
        id: promocode.id,
        type: promocode.type,
        code: promocode.code,
        value: promocode.value,
        isActive: promocode.isActive
    } : initialValues
    const form = useForm({
        resolver: zodResolver(promocodeSchema),
        defaultValues,
        mode: "onBlur"
    })

    const statusMessages = {
        loading: isUpdate ? "Збереження змін" : "Створення нового промокоду",
        success: isUpdate ? "Промокод оновлено" : "Промокод створено",
        error: "Помилка"
    }
    const mutateOptions = {
        onMutate: () => {
            toast.loading(statusMessages.loading, {id: 'loading'})
        },
        onSuccess: () => {
            toast.success(statusMessages.success)
            // router.push('/adminpanel/promocodes')
        },
        onSettled: () => {
            toast.dismiss('loading')
        },
        onError: () => {
            toast.error(statusMessages.error)
        }
    }

    const createPromocode = trpc.order.savePromocode.useMutation(mutateOptions)
    async function savePromocode (data: PromocodeSchemaValue) {
        try {
            createPromocode.mutate(data)
        } catch (e) {
            console.log(e);
        }
    }

    const handleReset = () => {
        form.reset()
        router.push("/adminpanel/promocodes")
    }
    return (
        <div>
            <PageTitle
                title={'Промокоди'}
                description={'Редактирование промокодов'}
                icon={<LuTicket className={'text-3xl'}/>}
            >
                <div className='flex gap-x-2'
                  onClick={form.handleSubmit(savePromocode)}
                >
                    <IconButton
                        icon={<BiSave className={'text-base'} />}
                    >
                        Сохранить
                    </IconButton>
                    <ClientProvider>
                        <Button className='h-10 w-10 p-1 hover:bg-red-500'
                            onClick={() => handleReset()}
                        >
                            <LuX className='text-lg' />
                        </Button>
                    </ClientProvider>

                </div>
            </PageTitle>

            <div className='pt-6'>
                <UIForm form={form}/>
            </div>
        </div>
    )
}

export default PromocodeForm