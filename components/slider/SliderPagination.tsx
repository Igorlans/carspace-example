"use client"

import { FC } from 'react'
import Image from 'next/image'
import { useEffect } from 'react'
import { useSwiper } from 'swiper/react'
import SelectedDecor from '../ui/custom/SelectedDecor'
interface SliderPaginationProps {
  activeIndex: number;
  pagination: any[]
}

const SliderPagination: FC<SliderPaginationProps> = ({ pagination, activeIndex }) => {
    const swiper = useSwiper()

    return (
      <div className="pagination pt-2 md:pt-4 hidden md:flex w-full gap-x-3">
            {
                pagination.map((item, i) => (
                  <div key={item.id} className='shrink-0 relative w-[60px] h-[60px] md:w-[90px] md:h-[90px] rounded-[4px] overflow-hidden hover:opacity-80 duration-300'
                    onClick={() => swiper.slideTo(i)}
                  >
                      <Image 
                          src={item.url}
                          title={item.name}
                          fill={true}
                          style={{objectFit: 'cover'}}
                          alt='product'
                      />
                      {
                        activeIndex === i && 
                            <SelectedDecor 
                              type="default"
                            />
                      }
                  </div>
              ))
            }
          </div>
    )
}

export default SliderPagination