import {FC, Suspense} from 'react'

import ProductGrid from '@/components/layouts/ProductGrid'
import ProductCard from '@/components/cards/ProductCard'
import Banner from "@/app/(client)/[locale]/category/(components)/Banner"
import Filters from '../category/(components)/Filters'

import {serverClient} from '@/app/_trpc/serverClient'
import {languageInputValues} from '@/types/types'
import {CategorySearchParams} from "@/types/category";
import UseTranslation from "@/helplers/UseTranslation";

interface pageProps {
    params: {
        slug: string
        locale: languageInputValues
    },
    searchParams?: CategorySearchParams;
}

export const dynamic = 'force-dynamic'

const page: FC<pageProps> = async ({params, searchParams}) => {
    const products = await serverClient.product.getAllProducts({
        language: 'ru',
        params: searchParams
    })


    return (
        <div className='overflow-hidden'>
            <Banner
                img={"/images/catalogBanner.jpeg"}
                title={<UseTranslation translate={'catalog'} namespace={'header'} />}
            />
            <div className='container pt-6'>
                <Suspense>
                    <Filters min={products.min || 0} max={products.max || 100_000} locale={params.locale}
                             order={products.order}/>
                </Suspense>

                <ProductGrid>
                    {
                        products.products?.map(product => {
                            const mainVariant = product.variants[0]
                            if (!mainVariant) return;

                            return (
                                <ProductCard
                                    product={product}
                                />
                            )
                        })
                    }
                </ProductGrid>
            </div>
        </div>
    )
}

export default page