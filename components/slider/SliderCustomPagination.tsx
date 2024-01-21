"use client"

import { useSwiper } from 'swiper/react';
import { SlArrowRight, SlArrowLeft } from "react-icons/sl"
import { FaChevronRight, FaChevronLeft } from "react-icons/fa6"

type SliderCustomPaginationProps = {
    total: number;
    activeSlide: number;
    maxBullets?: number;
    bulletsChunk?: number;
    className?: string;
    classNameNavigation?: string
}

const SliderCustomPagination = ( { total, activeSlide, maxBullets = 7, bulletsChunk = 3, className = ' swiper-custom-pagination', classNameNavigation = '' } : SliderCustomPaginationProps ) => {
    const swiper = useSwiper();

    const limitBullets = Math.ceil((bulletsChunk - 1) * 0.5);

    const isBeginning = activeSlide == 0;
    const isEnd = (activeSlide + 1) == total;

    const renderPaginationBullet = (index: number, title: number | string) => {
      var activeStyles = (activeSlide + 1) == index ? " swiper-pagination-bullet-active" : "";
      return (
        <span className={String("swiper-pagination-bullet font-dela text-[13px] text-customPrimary").concat(activeStyles).concat(className)} tabIndex={index} role="button" aria-label={String("Go to slide ").concat(title as string)} onClick={(e) => {console.log(e); index > 0 && swiper.slideTo(index - 1);}}>
          <span>{title}</span>
        </span>
      );
    }


    const renderPagination = () => {

      var result = [];

      if(total <= maxBullets) {
        for (let index = 1; index <= total; index++) {
          result.push(
            renderPaginationBullet(index, index)
          );
        }

      } else if( (activeSlide + 1) > bulletsChunk && (activeSlide + 1) < (total - bulletsChunk + 1) ){
        // There goes scheme: 1 ... 5 6 7 ... 10

        var activeStyles = (activeSlide + 1) == 1 ? " swiper-pagination-bullet-active" : "";
        result.push(
          renderPaginationBullet(1, 1)
        );

        result.push(
          renderPaginationBullet(-1, '...')
        );

        // Defines the number of bullets before and after
        const limitBulletsStart = (activeSlide + 1) - limitBullets;
        const limitBulletsEnd = (activeSlide + 1) + limitBullets;
        for (let index = limitBulletsStart; index <= limitBulletsEnd; index++) {
          result.push(
            renderPaginationBullet(index, index)
          );
        }

        var activeStyles = (activeSlide + 1) == total ? " swiper-pagination-bullet-active" : "";
        result.push(
          renderPaginationBullet(-1, '...')
        );

        result.push(
          renderPaginationBullet(total, total)
        );

      } else if ((activeSlide + 1) < bulletsChunk || (activeSlide + 1) > (total - bulletsChunk + 1)){
        // There goes scheme: 1 2 3 ... 8 9 10
        for (let index = 1; index <= bulletsChunk; index++) {
          result.push(
            renderPaginationBullet(index, index)
          );
        }

        result.push(
          renderPaginationBullet(-1, '...')
        );

        for (let index = (total - bulletsChunk + 1); index <= total; index++) {
          result.push(
            renderPaginationBullet(index, index)
          );
        }

      } else if((activeSlide + 1) == bulletsChunk) {
        // There goes scheme: 1 2 3 4 ... 9 10
        const limitBulletsStart = 1;
        const limitBulletsEnd = (activeSlide + 1) + limitBullets;
        for (let index = limitBulletsStart; index <= limitBulletsEnd; index++) {
          result.push(
            renderPaginationBullet(index, index)
          );
        }

        result.push(
          renderPaginationBullet(-1, '...')
        );

        // Define the bullets left
        const leftBullets = maxBullets - limitBulletsEnd - 1;
        const limitBulletsStartR = total - leftBullets + 1;
        const limitBulletsEndR = total;
        for (let index = limitBulletsStartR; index <= limitBulletsEndR; index++) {
          result.push(
            renderPaginationBullet(index, index)
          );
        }


      } else if((activeSlide + 1) == (total - bulletsChunk + 1)) {
        // There goes scheme: 1 2 ... 7 8 9 10
        const limitBulletsStart = activeSlide;
        const limitBulletsEnd = total;

        // Define the bullets left
        const leftBullets = maxBullets - (limitBulletsEnd - limitBulletsStart) - 2;
        for (let index = 1; index <= leftBullets; index++) {
          result.push(
            renderPaginationBullet(index, index)
          );
        }

        result.push(
          renderPaginationBullet(-1, '...')
        );

        for (let index = limitBulletsStart; index <= limitBulletsEnd; index++) {
          result.push(
            renderPaginationBullet(index, index)
          );
        }

      }

      return (
        <div className="swiper-pagination swiper-pagination-clickable swiper-pagination-bullets swiper-pagination-horizontal relative">
          {result}
          <div className={`${ classNameNavigation } center-controls flex absolute z-50 right-0 bottom-0 md:bottom-[-10px] lg:bottom-[-10px] gap-x-[11px] md:gap-x-[16px] lg:gap-x-[16px]`}>
              <button
                  className="cursor-pointer flex items-center justify-center pointer-events-auto w-[40px] md:w-[60px] lg:w-[60px] h-[40px] md:h-[60px] lg:h-[60px] rounded-[10px]"
                  style={{background: isBeginning ? "rgba(44, 51, 74, 0.20)" : "rgba(44, 51, 74, 0.70)"}}
                  onClick={() => swiper.slidePrev()}
              >
                  <FaChevronLeft className="text-[26px] md:text-[36px] lg:text-[36px] text-[#fff]" />
              </button>
              <button
                  className="cursor-pointer flex items-center justify-center pointer-events-auto w-[40px] md:w-[60px] lg:w-[60px] h-[40px] md:h-[60px] lg:h-[60px] rounded-[10px]"
                  style={{background: isEnd ? "rgba(44, 51, 74, 0.20)" : "rgba(44, 51, 74, 0.70)"}}
                  onClick={() => swiper.slideNext()}
              >
                  <FaChevronRight className="text-[26px] md:text-[36px] lg:text-[36px] text-[#fff]" />
              </button>
          </div>
        </div>
      );
    }

    return (
        renderPagination()
    );
};

export default SliderCustomPagination;
