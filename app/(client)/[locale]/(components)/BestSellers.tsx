import { FC } from 'react'
import SectionTitle from '@/components/sectionTitle/SectionTitle'
import MainCardSlider from './(mainSlider)/MainCardSlider'
import { serverClient } from '@/app/_trpc/serverClient';

import type { languageInputValues } from "@/types/types"
import UseTranslation from "@/helplers/UseTranslation";

interface BestSellersProps {
  locale: languageInputValues;
}

const BestSellers: FC<BestSellersProps> = async ({locale}) => {
  const bestsellers = await serverClient.product.getProductByType({
    type: "onBestsellers",
    language: locale
  })

  return (
    <section className='relative md:container'>
        <SectionTitle className='text-center'><UseTranslation translate={'bestsellers'} /></SectionTitle>
        <MainCardSlider
            slides={bestsellers}
            swiperId={"swiper-bestsellers"}
        />
    </section>
  )
}

export default BestSellers
