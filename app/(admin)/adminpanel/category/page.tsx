import { FC } from 'react'
import Breadcrumbs from '../components/Breadcrumbs';
import PageTitle from '../components/PageTitle';
import { HiOutlineTemplate } from "react-icons/hi"
import { AiOutlinePlus } from "react-icons/ai"
import Link from 'next/link';
import IconButton from '../components/IconButton';
import CategoryTable from './(components)/CategoryTable';
import ClientProvider from '@/providers/client-provider';
import {serverClient} from "@/app/_trpc/serverClient";

export const dynamic = 'force-dynamic'
export const revalidate = 0

const Page: FC = async ({}) => {
    const breadCrumbs = [
        {text: 'Главная', href: '/adminpanel'},
        {text: 'Категории', href: '/adminpanel/category'}
    ]

    const categories = await serverClient.category.getCategories("ru")

    return (
        <div>
            <Breadcrumbs links={breadCrumbs} />

            <PageTitle
                title={'Категории'}
                description={'Редактирование категорий'}
                icon={<HiOutlineTemplate className={'text-3xl'}/>}
            >
                <Link href="/adminpanel/category/create">
                    <IconButton
                        icon={<AiOutlinePlus className={'text-base'} />}
                    >
                        Добавить
                    </IconButton>
                </Link>
            </PageTitle>

            <div className='pt-6'>
                <ClientProvider>
                    <CategoryTable category={categories} />
                </ClientProvider>
            </div>
        </div>
    );
}

export default Page