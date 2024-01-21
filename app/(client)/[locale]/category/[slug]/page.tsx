import {FC, Suspense} from 'react'
import CategoryLayot from '../categoryLayot'
import Filters from '../(components)/Filters'
import Products from '../(components)/Products'
import {serverClient} from '@/app/_trpc/serverClient'
import {languageInputValues} from '@/types/types'
import {CategorySearchParams} from "@/types/category";
import {notFound} from "next/navigation";



interface pageProps {
    params: {
        slug: string
        locale: languageInputValues
    },
    searchParams?: CategorySearchParams;
}

export const dynamic = 'force-dynamic'

const page: FC<pageProps> = async ({params, searchParams}) => {
    const category = await serverClient.product.getProductByCategory({
        slug: params.slug,
        language: params.locale,
        params: searchParams
    })

    if (!category) {
        notFound()
    }

    return (
        <CategoryLayot locale={params.locale} category={category.category}>
            <div className='container'>
                <Suspense>
                    <Filters min={category.min || 0} max={category.max || 100_000} locale={params.locale} order={category.order}/>
                </Suspense>
                <Products products={category.products}/>
            </div>
        </CategoryLayot>
    )
}

export default page