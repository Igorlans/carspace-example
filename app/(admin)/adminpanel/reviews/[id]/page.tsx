import {$Enums} from "@prisma/client";
import {serverClient} from "@/app/_trpc/serverClient";
import Breadcrumbs from "@/app/(admin)/adminpanel/components/Breadcrumbs";

import ReviewForm from "../_components/ReviewForm";

const Page = async ({params}: { params: { language: $Enums.Language, id: string } }) => {
    const review = await serverClient.review.getSingleReview({
        id: params.id
    })

    const breadCrumbs = [
        {text: 'Главная', href: '/adminpanel'},
        {text: 'Отзывы', href: '/adminpanel/reviews'},
        {text: review?.name || 'Модерация отзыва', href: undefined},
    ]

    return (
        <>
            <Breadcrumbs links={breadCrumbs}/>

            <ReviewForm review={review} />
        </>
    )

};

export default Page;