"use client"

import {useEffect, useState} from "react";
import { Swiper } from 'swiper/react';
import { SwiperProps } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import "./style.css"
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import SliderPagination from "./SliderPagination";
import SliderControl from "./SliderControl";
import SliderControlCenter from "./SliderControlCenter";

import SliderCustomPagination from '@/components/slider/SliderCustomPagination';

interface SliderProps extends SwiperProps {
  children: React.ReactNode;
  slidesPerView: number;
  spaceBetween: number;
  variant: "onePerView" | "somePerView" | "banner";
  pagination?: boolean;
  controls?: "bottom" | "center" | "none";
  controlsStyle?: string;
  preview?: any[] | null;
}

export default function Slider ( { children, spaceBetween, slidesPerView, variant, controlsStyle, pagination = false, preview = null, controls = "none" } : SliderProps ) {

    const [isBeginning, setIsBeginning] = useState<boolean>(true)
    const [isEnd, setIsEnd] = useState<boolean>(false)
    const [activeSlide, setActiveSlide] = useState<number>(0)

    // n
    const total = Array.isArray(children) && children?.length ? children?.length : 0;

    const somePerViewBrakepoints = {
      150: {
        slidesPerView: pagination ? 2 : 1,
        slidesPerGroup: 1,
        spaceBetween: 15,
      },
      428: {
        slidesPerView: pagination ? 2 : 1,
        slidesPerGroup: 1,
        spaceBetween: 15,
      },
      600: {
        slidesPerView: slidesPerView - 1 ,
        slidesPerGroup: 1,
        spaceBetween: 15,
      },
      991: {
        slidesPerView: slidesPerView,
        slidesPerGroup: 1,
        spaceBetween: 30,
      },
    }
    const onePerViewBrakepoints = {
      150: {
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: spaceBetween,
      },
      428: {
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: spaceBetween,
      },
      600: {
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: spaceBetween,
      },
      991: {
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: spaceBetween,
      },
    }

    // modules={pagination ? [Navigation, Pagination, Scrollbar, A11y] : []}

    // pagination={{ clickable: true }}


    return (
        <Swiper
            spaceBetween={spaceBetween}
            slidesPerView={slidesPerView}
            modules={pagination ? [Navigation, Scrollbar, A11y] : []}
            onSlideChange={(e) => {
                setActiveSlide(e.activeIndex)
                setIsBeginning(e.isBeginning)
                setIsEnd(e.isEnd)
              }
            }
            style={{ padding: variant === "somePerView" ? "12px" : "0", position: "relative"}}
            breakpoints={
              variant === "onePerView" ? onePerViewBrakepoints : somePerViewBrakepoints
            }

        >

        {
            children
        }

        {
          /*controls === "bottom" ?
              <SliderControl
                isBeginning={isBeginning}
                isEnd={isEnd}
                className={controlsStyle}
              /> :
          controls === "center" ?
            <SliderControlCenter
              isBeginning={isBeginning}
              isEnd={isEnd}
              className={controlsStyle}
            /> : null*/
        }

        {
          preview &&
            <SliderPagination pagination={preview} activeIndex={activeSlide} />
        }

        <SliderCustomPagination
          total={total}
          activeSlide={activeSlide}
          maxBullets={7}
          bulletsChunk={3}
        />

      </Swiper>
    );
};
