import {FC} from 'react'
import Buy from '../(components)/(buy)/Buy'
import Tabs from '../(components)/(tabs)/Tabs'
import {serverClient} from '@/app/_trpc/serverClient'
import BreadCrumbsClient from "@/app/(client)/[locale]/products/(components)/BreadCrumbsClient";
import {notFound} from "next/navigation";
import {getHTTPStatusCodeFromError} from "@trpc/server/http";
import UseTranslation from "@/helplers/UseTranslation";
import prisma from "@/prisma/client";

interface pageProps {
    params: {
        slug: string,
        locale: "ru" | "uz"
    }
}



export async function generateStaticParams() {
  const products = await prisma.product.findMany({
    select: {
      id: true
    }
  })

  return [
    ...products.map((product) => ({
      slug: product.id,
    })),
  ]
}



export const dynamicParams = true
export const revalidate = 86400
const page: FC<pageProps> = async ({params}) => {
    let product;
    try {
        product = await serverClient.product.getOneProduct({
            id: params.slug,
            language: params.locale
        })
    } catch (e: any) {
        // if (e instanceof TRPCError) {
            const httpCode = getHTTPStatusCodeFromError(e);
            if (httpCode === 404) {
                return notFound()
            }
        // }
    }

    if (!product) return;


    const commonQuestions = await serverClient.question.getCommonQuestions(params.locale)

    const breadcrumbs = [
        {text: <UseTranslation namespace={'productData'} translate={'main'} />, href: '/'},
        {text: product.category.title, href: `/category/${product.categoryId}`},
        {text: product.variants[0].title, href: `/products/${product.id}`},
    ]

    product.reviews = product?.reviews?.filter((review, i) => {
      return review?.status === 'ALLOWED' && review?.isPublic == true;
    })


    return (
        <div className=''>
            <div className='container mb-8'>
                <BreadCrumbsClient links={breadcrumbs} />
            </div>
            <Buy
                product={product}
            />
            <Tabs
                product={{...product, questions: [...commonQuestions, ...product.questions]}}
                reviews={product.reviews}
            />
        </div>
    )
}

export default page
