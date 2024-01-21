"use client"

import { FC } from 'react'
import ClientProvider from '@/providers/client-provider'
import Slider from '@/components/slider/Slider'
import SliderOuter from '@/components/slider/SliderOuter'
import { SwiperSlide } from 'swiper/react';

import ProductCard from '@/components/cards/ProductCard';
import {gtmService} from "@/services/gtm/gtmService";
import {FullProduct} from "@/types/product";

interface MainSliderProps {
  slides: FullProduct[];
  swiperId?: string;
}

const MainCardSlider: FC<MainSliderProps> = ({ slides, swiperId = "swiper" }) => {
  if (!slides) return
  return (
    <ClientProvider>
        <SliderOuter
          spaceBetween={30}
          slidesPerView={4}
          pagination={true}
          controls="center"
          controlsStyle='text-black'
          variant="somePerView"
          swiperId={swiperId}
        >
            {
              slides.map(slide => (
                <SwiperSlide key={slide.id}>
                  <ProductCard
                    product={slide}
                    onClick={() => gtmService.selectItem(slide, slide?.variants[0])}
                  />
                </SwiperSlide>
              ))
            }
        </SliderOuter>
    </ClientProvider>
  )
}

export default MainCardSlider
