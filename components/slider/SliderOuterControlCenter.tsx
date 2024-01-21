"use client"

import { useSwiper } from 'swiper/react';
import { SlArrowRight, SlArrowLeft } from "react-icons/sl"
type SliderControlProps = {
    isBeginning: boolean;
    isEnd: boolean;
    className?: string;
    swiperId: string;
}

const SliderOuterControlCenter = ( { isBeginning, isEnd, className = 'float-right', swiperId = '' } : SliderControlProps ) => {
    // const swiper = useSwiper();
    // console.log("Swiper ID", swiperId);
    // console.log("Swiper", document.querySelector(String("#").concat(swiperId)));
    // const swiper = document.querySelector(String("#").concat(swiperId)).swiper;

    const onPrev = () => {
      var temp = document.querySelector(String("#").concat(swiperId));
      if(temp && 'swiper' in temp){
        try {
          var swiper = temp['swiper'];
          if(swiper !== null && typeof swiper === 'object' && 'slidePrev' in swiper && typeof swiper['slidePrev'] === 'function'){
            swiper?.slidePrev();
          }
        } catch (error) {
          console.log(error);
        }
      }
    }

    const onNext = () => {
      var temp = document.querySelector(String("#").concat(swiperId));
      if(temp && 'swiper' in temp){
        try {
          var swiper = temp['swiper'];

          if(swiper !== null && typeof swiper === 'object' && 'slideNext' in swiper && typeof swiper['slideNext'] === 'function'){
            swiper?.slideNext();
          }
        } catch (error) {
          console.log(error);
        }
      }
    }

    return (
        <div className={`${ className } hidden sm:flex md:flex lg:flex center-controls flex pointer-events-none justify-between w-full absolute z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`} style={{width: '98vw'}}>
            <button
                className="cursor-pointer flex items-center justify-center pointer-events-auto"
                style={{opacity: isBeginning ? "0.5" : "1"}}
                onClick={onPrev}
            >
                <SlArrowLeft className="text-[40px]" />
            </button>
            <button
                className="cursor-pointer flex items-center justify-center pointer-events-auto"
                style={{opacity: isEnd ? "0.5" : "1"}}
                onClick={onNext}
            >
                <SlArrowRight className="text-[40px]" />
            </button>
        </div>
    );
};

export default SliderOuterControlCenter;
