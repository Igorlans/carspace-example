"use client"

import { HiChevronRight, HiChevronLeft } from "react-icons/hi";
import { useSwiper } from 'swiper/react';

type SliderControlProps = {
    isBeginning: boolean;
    isEnd: boolean;
    className?: string;
    swiperId: string;
}

const SliderOuterControl = ( { isBeginning, isEnd, className = 'float-right', swiperId = '' } : SliderControlProps ) => {
    // const swiper = useSwiper();

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
        <div className={`h-11 py-1 pt-4 flex gap-5 ${ className }`}>
            <button
                className="cardShadow w-9 h-9 bg-white rounded-full hover:border shadow-md cursor-pointer flex items-center justify-center"
                style={{opacity: isBeginning ? "0.5" : "1"}}
                onClick={onPrev}
            >
                <HiChevronLeft className="text-customSecondary" />
            </button>
            <button
                className="cardShadow w-9 h-9 bg-white rounded-full hover:border shadow-md cursor-pointer flex items-center justify-center"
                style={{opacity: isEnd ? "0.5" : "1"}}
                onClick={onNext}
            >
                <HiChevronRight className="text-customSecondary" />
            </button>
        </div>
    );
};

export default SliderOuterControl;
