"use client"

import { useSwiper } from 'swiper/react';
import { SlArrowRight, SlArrowLeft } from "react-icons/sl"
type SliderControlProps = {
    isBeginning: boolean
    isEnd: boolean
    className?: string
}

const SliderControlCenter = ( { isBeginning, isEnd, className = 'float-right' } : SliderControlProps ) => {
    const swiper = useSwiper();
    return (
        <div className={`${ className } center-controls flex pointer-events-none justify-between w-full absolute z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}>
            <button
                className="cursor-pointer flex items-center justify-center pointer-events-auto"
                style={{opacity: isBeginning ? "0.5" : "1"}}
                onClick={() => swiper.slidePrev()}
            >
                <SlArrowLeft className="text-[40px]" />
            </button>
            <button
                className="cursor-pointer flex items-center justify-center pointer-events-auto"
                style={{opacity: isEnd ? "0.5" : "1"}}
                onClick={() => swiper.slideNext()}
            >
                <SlArrowRight className="text-[40px]" />
            </button>
        </div>
    );
};

export default SliderControlCenter;