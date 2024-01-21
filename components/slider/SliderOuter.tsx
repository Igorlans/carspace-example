"use client"

import {useEffect, useState, useRef} from "react";
import { Swiper } from 'swiper/react';
import { SwiperProps } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import "./style.css"
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import SliderPagination from "./SliderPagination";
import SliderOuterControl from "./SliderOuterControl";
import SliderOuterControlCenter from "./SliderOuterControlCenter";

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
  swiperId?: string;
}

export default function SliderOuter ( { children, spaceBetween, slidesPerView, variant, controlsStyle, pagination = false, preview = null, controls = "none", swiperId = "swiper" } : SliderProps ) {

    const [isBeginning, setIsBeginning] = useState<boolean>(true)
    const [isEnd, setIsEnd] = useState<boolean>(false)
    const [activeSlide, setActiveSlide] = useState<number>(0)

    const swiperRef = useRef(null);
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

    // const renderBullet = (index: number | null, className: string | null) => {
    //   return '<span class="swiper-pagination-bullet swiper-custom-pagination font-dela text-[13px] text-customPrimary" tabindex="' + index + '" role="button" aria-label="Go to slide ' + (index + 1) + '"><span>' + (index + 1) + '</span></span>';
    // }

    // modules={pagination ? [Navigation, Pagination, Scrollbar, A11y] : []}

    // pagination={{
    //   clickable: true,
    //   renderBullet: renderBullet
    // }}
    return (
        <>
        <Swiper
            id={swiperId}
            modules={pagination ? [Navigation, Scrollbar, A11y] : []}
            spaceBetween={spaceBetween}
            slidesPerView={slidesPerView}
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
      {/*
        controls === "bottom" ?
            <SliderOuterControl
              isBeginning={isBeginning}
              isEnd={isEnd}
              className={controlsStyle}
              swiperId={swiperId}
            /> :
        controls === "center" ?
          <SliderOuterControlCenter
            isBeginning={isBeginning}
            isEnd={isEnd}
            className={controlsStyle}
            swiperId={swiperId}
          /> : null
      */}
      </>
    );
};
