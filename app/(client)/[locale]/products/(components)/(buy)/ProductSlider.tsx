import { FC } from 'react'

import { useState } from 'react'
import ClientProvider from '@/providers/client-provider'

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Controller, Thumbs } from 'swiper/modules';
import { SwiperClass } from 'swiper/react';
import { FullProduct } from '@/types/product'

import "./style.css"
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import Image from 'next/image';
import DiscountDecor from '@/components/ui/custom/DiscountDecor';
import SliderControlCenter from '@/components/slider/SliderControlCenter';
import SelectedDecor from '@/components/ui/custom/SelectedDecor';

import SliderCustomPagination from '@/components/slider/SliderCustomPagination';

interface ProductSliderProps {
    product: FullProduct;
    discountValue: string | null
}

const onePerViewBrakepoints = {
    150: {
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 50,
    },
    428: {
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 50,
    },
    600: {
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 50,
    },
    991: {
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 50,
    },
}

const ProductSlider: FC<ProductSliderProps> = ({ product, discountValue }) => {
    const sortedImages = product.images.slice(1).sort((a, b) => Number(a.name) - Number(b.name))

    // Swiper thumbsinstance
    const [swiperThumbs, updateSwiperThumbs] = useState<SwiperClass>();

    const [isBeginning, setIsBeginning] = useState<boolean>(true)
    const [isEnd, setIsEnd] = useState<boolean>(false)
    const [activeSlide, setActiveSlide] = useState<number>(0)

    // const renderBullet = (index: number | null, className: string | null) => {
    //   var result = '<span class="swiper-pagination-bullet swiper-custom-pagination font-dela text-[13px] text-customPrimary" data-class="' + className + '" tabindex="' + index + '" role="button" aria-label="Go to slide ' + (index + 1) + '"><span>' + (index + 1) + '</span></span>';
    //
    //   return result;
    // }




    // thumbs={{ swiper: swiperThumbs}}
    // modules={[Controller, Pagination, Navigation, Thumbs]}
    // pagination={{
    //   clickable: true,
    //   renderBullet: renderBullet
    // }}
    return (
        <>
            <ClientProvider>
                <Swiper
                    spaceBetween={50}
                    slidesPerView={1}
                    modules={[Controller, Navigation, Thumbs]}
                    onSlideChange={(e) => {
                        setActiveSlide(e.activeIndex)
                        setIsBeginning(e.isBeginning)
                        setIsEnd(e.isEnd)
                      }
                    }

                    style={{ position: "relative" }}
                    breakpoints={onePerViewBrakepoints}
                    className="h-[123vw] md:h-[530px] lg:h-[667px]"
                >
                    {
                        sortedImages.length === 0 ?
                            <div className='absolute top-1/3 left-1/2 -translate-y-1/2'>фото товару відсутні</div> :
                        sortedImages.map(slide => (

                            <SwiperSlide key={slide.id} className='aspect-square relative w-full h-[133vw] md:h-[300px] lg:h-[375px] rounded-[10px] overflow-hidden'>
                                <Image
                                    src={slide.url}
                                    title={slide.name!}
                                    fill={true}
                                    style={{objectFit: 'contain'}}
                                    alt={slide.name!}
                                    className='aspect-square'
                                />
                                {
                                    discountValue &&
                                    <DiscountDecor
                                        discount={`-${discountValue}%`}
                                    />
                                }
                            </SwiperSlide>
                        ))
                    }
                    {
                        product.video &&
                            <SwiperSlide className='aspect-square relative w-full md:h-[400px] lg:h-[500px] rounded-[10px] overflow-hidden'>
                                <video className='w-full h-full object-cover' controls={true}>
                                    <source src={product?.video} type="video/mp4"/>
                                </video>
                            </SwiperSlide>
                    }

                    <SliderCustomPagination
                      total={sortedImages?.length}
                      activeSlide={activeSlide}
                      maxBullets={7}
                      bulletsChunk={3}
                    />
                    {/*<SliderControlCenter
                      isBeginning={isBeginning}
                      isEnd={isEnd}
                      className="text-white"
                    />*/}
                </Swiper>
                {/*<div className='pt-2 md:pt-4 hidden'>
                    <Swiper
                        spaceBetween={10}
                        slidesPerView={5}
                        modules={[Controller, Thumbs]}
                        breakpoints={
                            {
                                150: {
                                    slidesPerView: 1,
                                    slidesPerGroup: 1,
                                    spaceBetween: 10,
                                },
                                428: {
                                    slidesPerView: 2,
                                    slidesPerGroup: 1,
                                    spaceBetween: 10,
                                },
                                600: {
                                    slidesPerView: 4,
                                    slidesPerGroup: 1,
                                    spaceBetween: 10,
                                },
                                991: {
                                    slidesPerView: 5,
                                    slidesPerGroup: 1,
                                    spaceBetween: 10,
                                },
                            }
                        }
                        slideToClickedSlide={true}
                        onSwiper={updateSwiperThumbs}
                        watchSlidesProgress
                        style={{ position: "relative" }}
                    >
                        {
                            sortedImages.map((slide, i) => (
                                <SwiperSlide key={slide.id}>
                                    <div
                                        className='shrink-0 relative w-[60px] h-[60px] md:w-[90px] md:h-[90px] rounded-[4px] overflow-hidden cursor-pointer'>
                                        <Image
                                            src={slide.url}
                                            title={slide.name!}
                                            fill={true}
                                            style={{objectFit: 'cover'}}
                                            alt={slide.name!}
                                            className='aspect-square'
                                        />
                                        {
                                          activeSlide === i &&
                                              <SelectedDecor
                                                type="default"
                                              />
                                        }
                                    </div>
                                </SwiperSlide>
                            ))
                        }
                        {
                            product.video &&
                                <SwiperSlide>
                                    <div
                                        className='shrink-0 relative w-[60px] h-[60px] md:w-[90px] md:h-[90px] rounded-[4px] overflow-hidden cursor-pointer'>
                                        {
                                          isEnd &&
                                              <SelectedDecor
                                                type="default"
                                              />
                                        }
                                        <video
                                            className='w-full h-full object-cover aspect-square'
                                            controls={false}>
                                            <source src={product?.video} type="video/mp4"/>
                                        </video>
                                    </div>
                                </SwiperSlide>
                        }
                    </Swiper>
                </div>*/}
            </ClientProvider>
        </>
    )
}

export default ProductSlider
