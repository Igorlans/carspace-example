import { FC } from 'react'

import NavTitle from '@/components/navTitle/NavTitle'
import SectionTitle from '@/components/sectionTitle/SectionTitle'
import Steps from './(components)/Steps'
import type { languageInputValues } from "@/types/types"
import { serverClient } from '@/app/_trpc/serverClient'
import UseTranslation from "@/helplers/UseTranslation";
interface pageProps {
  params: {
    slug: string,
    locale: languageInputValues
  }
}

export const dynamic = 'force-dynamic'
const page: FC<pageProps> = async ({ params }) => {
  const bestsellers = await serverClient.product.getProductByType({
    type: "onBestsellers",
    language: params.locale
  })
  const promocodes = await serverClient.order.getPromocodes()
  return (
    <div className=''>
      <div className='container'>
        <NavTitle link='/'><UseTranslation translate={'toShopping'}/></NavTitle>
      </div>
        <div className='sectionGap'>
          <div className='container'>
            <div className='border-primary border-b'>
                <SectionTitle align="left"><UseTranslation translate={'ordering'}/></SectionTitle>
            </div>
          </div>
            <Steps products={bestsellers} locale={params.locale} promocodes={promocodes} />
        </div>
    </div>
  )
}

export default page