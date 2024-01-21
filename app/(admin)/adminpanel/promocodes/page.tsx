import { FC } from 'react'
import Breadcrumbs from '../components/Breadcrumbs';
import PageTitle from '../components/PageTitle';
import { LuTicket } from "react-icons/lu"
import { AiOutlinePlus } from "react-icons/ai"
import Link from 'next/link';
import IconButton from '../components/IconButton';
import PromocodesTable from './_components/PromocodesTable';
import {serverClient} from "@/app/_trpc/serverClient";

export const dynamic = 'force-dynamic'
export const revalidate = 0

const Page: FC = async ({}) => {
    const breadCrumbs = [
        {text: 'Главная', href: '/adminpanel'},
        {text: 'Промокоды', href: '/adminpanel/promocodes'}
    ]

    const promocodes = await serverClient.order.getPromocodes()
    
    return (
        <div>
            <Breadcrumbs links={breadCrumbs} />

            <PageTitle
                title={'Промокоды'}
                description={'Просмотр промокодов'}
                icon={<LuTicket className={'text-3xl'}/>}
            >
                <Link href="/adminpanel/promocodes/create">
                    <IconButton
                        icon={<AiOutlinePlus className={'text-base'} />}
                    >
                        Добавить
                    </IconButton>
                </Link>
            </PageTitle>

            <div className='pt-6'>
                <PromocodesTable promocodes={promocodes} />
            </div>
        </div>
    );
}

export default Page