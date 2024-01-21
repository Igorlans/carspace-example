"use client"

import { FC } from 'react'
import { Button } from '@/components/ui/button'
import { LuSave } from 'react-icons/lu'
import DeleteAlert from './DeleteAlert'
import Image from 'next/image'
import EmptyList from './EmptyList'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    Table,
    TableBody,
    TableCaption,
    TableHead,
    TableHeader,
    TableRow,
    TableCell
} from "@/components/ui/table"

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import FormImage from '@/components/ui/custom/FormImage'
import FormImageCustom from '@/components/ui/custom/media-hosting/FormImageCustom'

import { bannerImageSchema } from '@/types/banner'
import type { BannerImageValue } from '@/types/banner'
import type { ImageInputValue } from '@/types/types'

import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

import { Form } from '@/components/ui/form'
import { RouterOutput, trpc } from '@/app/_trpc/client'
import FormInput from '@/components/ui/custom/FormInput'

interface BannerImageProps {
    images: RouterOutput["banner"]["getBanner"]
}

const BannerImage: FC<BannerImageProps> = ({ images }) => {
    const router = useRouter()

    const defaultValues: BannerImageValue = {
        urlDesktop: "",
        urlMobile: "",
        link: undefined,
        name: "Банер"
    }
    const form = useForm<BannerImageValue>({
        resolver: zodResolver(bannerImageSchema),
        defaultValues,
        mode: "onBlur"
    })
    const statusMessages = {
        loading: "Сохранение изменений",
        success: "Изображение добавлено",
        error: "Ошибка"
    }
    const mutateOptions = {
        onMutate: () => {
            toast.loading(statusMessages.loading, {id: 'loading'})
        },
        onSuccess: () => {
            toast.success(statusMessages.success)
            form.reset()
            router.refresh()
        },
        onSettled: () => {
            toast.dismiss('loading')
        },
        onError: () => {
            toast.error(statusMessages.error)
        }
    }

    const createBanner = trpc.banner.createBanner.useMutation(mutateOptions)
    async function saveImage (data: BannerImageValue) {
        createBanner.mutate(data)
    }
    return (
        <div className='pt-11'>
            <div className='flex items-center justify-between'>
                <h1 className='text-black text-2xl font-bold uppercas'>Банер</h1>
                <Button className='flex items-center justify-between gap-x-2'
                    disabled={!!!form.formState.isValid}
                    onClick={form.handleSubmit(saveImage)}
                >
                    <LuSave className='text-lg' />
                    Сохранить фото
                </Button>
            </div>
            <Form {...form}>
                <Tabs defaultValue="desktop">
                    <TabsList>
                    <TabsTrigger value="desktop">Банер (десктоп)</TabsTrigger>
                    <TabsTrigger value="mobile">Банер (мобильный)</TabsTrigger>
                    </TabsList>
                    <TabsContent value="desktop">
                        <div className='flex flex-col gap-y-1 pt-8'>
                            <div className='flex flex-col md:max-w-[50%] pb-8'>
                                <FormInput
                                    name="link"
                                    control={form.control}
                                    label='Ссылка'
                                />
                                {/*<FormImage
                                    name="urlDesktop"
                                    control={form.control}
                                    label=""
                                    aspectRatio={16/5}
                                />*/}
                                <FormImageCustom name={"urlDesktop"}
                                           control={form.control}
                                           label={''}
                                           siteEntity={"Banner"}
                                           siteEntityField={"urlDesktop"}
                                           siteEntityId={"new"}
                                           compressionType={"light"}
                                />
                            </div>
                            <ImageTable images={images?.desktop} />
                        </div>
                    </TabsContent>
                    <TabsContent value="mobile">
                        <div className='flex flex-col gap-y-1 pt-8'>
                            <div className='flex flex-col md:max-w-[50%] pb-8'>
                                <FormInput
                                    name="link"
                                    control={form.control}
                                    label='Ссылка'
                                />
                                {/*<FormImage
                                    name="urlMobile"
                                    control={form.control}
                                    label=""
                                    aspectRatio={16/10}
                                />*/}
                                <FormImageCustom name={"urlMobile"}
                                           control={form.control}
                                           label={''}
                                           siteEntity={"Banner"}
                                           siteEntityField={"urlMobile"}
                                           siteEntityId={"new"}
                                           compressionType={"light"}
                                />
                            </div>
                            <ImageTable images={images?.mobile} />
                        </div>
                    </TabsContent>
                </Tabs>
            </Form>
        </div>
    )
}

export default BannerImage


const ImageTable = ({ images }: {images: ImageInputValue[] | undefined}) => {
    const router = useRouter()
    if (!images) return
    const statusMessages = {
        loading: "Видалення зображення",
        success: "Зображення видалено",
        error: "Помилка"
    }
    const mutateOptions = {
        onMutate: () => {
            toast.loading(statusMessages.loading, {id: 'loading'})
        },
        onSuccess: () => {
            toast.success(statusMessages.success)
            router.refresh()
        },
        onSettled: () => {
            toast.dismiss('loading')
        },
        onError: () => {
            toast.error(statusMessages.error)
        }
    }
    const deleteBanner = trpc.banner.deleteBanner.useMutation(mutateOptions)
    async function handleDelete(id: string) {
        deleteBanner.mutate({
            id
        })
    }
    return (
        <div className='mt-4'>
            <Table>
                <TableCaption>
                {
                    images?.length === 0 ?
                    <EmptyList message='Список изображений пуст' /> :
                    <>Список всех изображений</>
                }
                </TableCaption>
                <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">№</TableHead>
                    <TableHead>Изображение</TableHead>
                    <TableHead className='text-right'>Редактировать</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        images?.map((item, i) => (
                            <TableRow>
                                <TableCell className="font-medium">{i+1}</TableCell>
                                <TableCell>
                                    <div className="relative w-full h-[200px] rounded-md overflow-hidden">
                                        <Image
                                            fill
                                            className="object-cover"
                                            alt={item?.name + "1"}
                                            src={item?.url}
                                        />
                                    </div>
                                </TableCell>
                                <TableCell className='flex gap-x-2 float-right'>
                                    <DeleteAlert action={() => handleDelete(item?.id!)}/>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>

            </Table>
        </div>
  )
}
