"use client"

import { FC } from 'react'
import { useMemo } from 'react'

import SectionTitle from '@/components/sectionTitle/SectionTitle'
import ClientProvider from '@/providers/client-provider'
import Slider from '@/components/slider/Slider'
import { SwiperSlide } from 'swiper/react'
import ReviewCard from '@/components/cards/ReviewCard'
import { Button } from '@/components/ui/button'
import Link from 'next-intl/link'
import {useTranslations} from "use-intl";
import { RouterOutput } from '@/app/_trpc/client'
import dayjs from 'dayjs'

interface ReviewsProps {
  locale: string;
  reviews: RouterOutput["review"]["getModeratedReviews"]
}

const Reviews: FC<ReviewsProps> = ({ reviews }) => {
  const t = useTranslations()
  const button = useTranslations("buttons")
  const now = new Date().getTime()

  const sortedReviews: RouterOutput["review"]["getModeratedReviews"] = useMemo(() => {
    return reviews.sort((item1, item2) =>  parseFloat(item2.createdAt) - parseFloat(item1.createdAt))
  }, [reviews])
  return (
    <section className='md:container reviews-wrapper pb-[41px] md:pb-[46px] lg:pb-[46px]'>
        <SectionTitle className='text-center'>{t("recentReviews")}</SectionTitle>
        <ClientProvider>
          <Slider
            spaceBetween={30}
            slidesPerView={3}
            pagination={false}
            controls="center"
            controlsStyle='text-black'
            variant="somePerView"
          >
              {
                sortedReviews?.map(review => (
                  <SwiperSlide key={review.id}>
                    <ReviewCard
                      revieww={review}
                      // className='md:max-w-[300px] md:min-w-[300px] w-full min-h-[220px] md:min-h-[240px]'
                      className='md:max-w-[300px] min-h-[220px] md:min-h-[240px]'
                    />
                  </SwiperSlide>
                ))
              }
          </Slider>
        </ClientProvider>
    </section>
  )
}

export default Reviews
