"use client"

import { FC } from 'react'
import Image from 'next/image'
import SelectedDecor from '@/components/ui/custom/SelectedDecor'
import { FullProduct } from '@/types/product'

interface ProductSelectProps {
  pagination: FullProduct
  activeVariant: string | undefined;
  onVariantChange: (id: string) => void
}

const ProductSelect: FC<ProductSelectProps> = ({ pagination, activeVariant, onVariantChange }) => {

    return (
      <div className="pagination cursor-pointer flex flex-nowrap md:flex-wrap w-full gap-y-2 gap-x-[10px] md:gap-x-[25px] lg:gap-x-[25px]">
            {
                pagination.variants.map(item => (
                  <div className='shrink-0 relative w-[65px] h-[65px] md:w-[100px] md:h-[100px] rounded-[4px] overflow-hidden hover:opacity-80 duration-300'
                    key={item.image?.id}
                    onClick={() => onVariantChange(item?.id)}
                  >
                      <Image
                        //@ts-ignore
                          src={item.image?.url}
                          title={item.image?.name!}
                          fill={true}
                          style={{objectFit: 'cover'}}
                          alt={item.image?.name!}
                      />
                      {
                        activeVariant === item.id &&
                            <SelectedDecor
                              type="checked"
                            />
                      }
                  </div>
              ))
            }
          </div>
    )
}

export default ProductSelect
