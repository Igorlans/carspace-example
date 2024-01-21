import { FC } from 'react'
import Breadcrumbs from '../components/Breadcrumbs';
import PageTitle from '../components/PageTitle';
import { GoComment } from "react-icons/go"
import {serverClient} from "@/app/_trpc/serverClient";
import ReviewsTable from './_components/ReviewsTable';
export const dynamic = 'force-dynamic'
export const revalidate = 0

const Page: FC = async ({}) => {
    const breadCrumbs = [
        {text: 'Главная', href: '/adminpanel'},
        {text: 'Отзывы', href: '/adminpanel/reviews'}
    ]

    const reviews = await serverClient.review.getReviews()
    
    return (
        <div>
            <Breadcrumbs links={breadCrumbs} />

            <PageTitle
                title={'Отзывы'}
                description={'Просмотр отзывов'}
                icon={<GoComment className={'text-3xl'}/>}
            >
            </PageTitle>

            <div className='pt-6'>
                <ReviewsTable reviews={reviews} />
            </div>
        </div>
    );
}

export default Page