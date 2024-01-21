"use client"

import { FC } from 'react'

import PageTitle from '../components/PageTitle';
import { HiOutlineTemplate } from "react-icons/hi"
import { BiSave } from "react-icons/bi"
import { LuX } from "react-icons/lu"
import { Button } from '@/components/ui/button';
import IconButton from '../components/IconButton';
import ClientProvider from '@/providers/client-provider';

import { useRouter } from 'next/navigation';
import CreateForm from './(components)/CreateForm';
import { toast } from 'react-hot-toast';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { categorySchema } from './formSchema';
import type { ICategorySchema } from './formSchema';

import {RouterOutput, trpc} from "@/app/_trpc/client";

interface CategoryFormProps {
  category?: RouterOutput['category']['getCategories'][number] | null | undefined
}

const CategoryForm: FC<CategoryFormProps> = ({ category }) => {
    const router = useRouter();

    const isUpdate = !!category

    const initialValue: ICategorySchema = {
        title: "",
        title_uz: "",
        banner: ""
    }

    const defaultValues: ICategorySchema = isUpdate ? {
        title: category?.title!,
        title_uz: category?.title_uz!,
        banner: category?.Banner!
    } : initialValue;

    const loadingMessage = isUpdate ? 'Обновление категории...' : 'Создание категории...';
    const successMessage = isUpdate ? 'Категорию обновлено' : 'Категорию создано';
    const errorMessage = isUpdate ? 'Ошибка обновления категории' : 'Ошибка создания категории';

    const form = useForm<ICategorySchema>({
        resolver: zodResolver(categorySchema),
        defaultValues,
        mode: 'onBlur'
    })


    const mutateOptions = {
        onMutate: () => {
            toast.loading(loadingMessage, {id: 'loading'})
        },
        onSuccess: () => {
            toast.success(successMessage)
            // router.push('/adminpanel/category')
        },
        onSettled: () => {
            toast.dismiss('loading')
        },
        onError: () => {
            toast.error(errorMessage)
        }
    }

    const createCategory= trpc.category.createCategory.useMutation(mutateOptions)
    const categorySave = async (data: ICategorySchema) => {
        try {
            isUpdate ? createCategory.mutate({...data, id: category?.id}) : createCategory.mutate(data)
        } catch (e) {
            console.log(e);
        }
    }

    const handleCanсel = () => {
        form.reset()
        router.push("/adminpanel/category")
    }

  return (
    <div>
        <PageTitle
            title={'Категории'}
            description={'Создание новой категории'}
            icon={<HiOutlineTemplate className={'text-3xl'}/>}
        >
            <div className='flex gap-x-2'
              onClick={form.handleSubmit(categorySave)}
            >
                <IconButton
                    icon={<BiSave className={'text-base'} />}
                >
                    Сохранить
                </IconButton>
                <ClientProvider>
                    <Button className='h-10 w-10 p-1 hover:bg-red-500'
                        onClick={() => handleCanсel()}
                    >
                        <LuX className='text-lg' />
                    </Button>
                </ClientProvider>
            </div>
        </PageTitle>

        <div className='pt-6'>
          <CreateForm form={form} />
        </div>
    </div>
  )
}

export default CategoryForm