"use client"

import { FC } from 'react'

import Slider from '@/components/slider/Slider'
import { SwiperSlide } from 'swiper/react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { ImageInputValue } from '@/types/types'
import Link from 'next/link'

interface BannerProps {
  images: ImageInputValue[] | undefined;
  title?: string;
  className: string;
  height: string
}

const Banner: FC<BannerProps> = ({ title, images, className, height }) => {
    return (
        <div className={cn('relative', className)}>
            <h1 className='font-dela uppercase text-center text-2xl md:text-3xl text-white'>{title}</h1>
            <Slider
              spaceBetween={30}
              slidesPerView={1}
              controls={images && images?.length > 1 ? "center" : "none"}
              variant="onePerView"
            >
                {
                  images?.map((slide, i) => (
                    <SwiperSlide key={slide.id}>
                      <Link href={slide.link ?? "#"}
                        style={{pointerEvents: slide.link ? "all" : "none"}}
                      >
                        <div className={cn('relative w-[100%] md:h-[500px]', height)}>
                          <Image
                              src={slide?.url}
                              fill={true}
                              sizes={'80vw'}
                              loading={'eager'}
                              style={{objectFit: 'cover', zIndex: "-5"}}
                              title={`${slide?.name}${i+1}`}
                              alt={`${slide?.name}${i+1}`}
                          />
                        </div>
                      </Link>
                    </SwiperSlide>
                  ))
                }
            </Slider>
        </div>
      )
}

export default Banner