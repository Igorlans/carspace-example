"use client"

import { FC } from 'react'
import Image from 'next/image';
import Link from 'next-intl/link';
import { Button } from '../ui/button';
import DiscountDecor from '../ui/custom/DiscountDecor';

import { RouterOutput } from '@/app/_trpc/client';
import {useTranslations} from "use-intl";
import AvailabilityTag from '../ui/custom/AvailabilityTag';
import { $Enums } from '@prisma/client';

interface ProductCardProps {
  product: RouterOutput["product"]["getProductByType"][number]
  onClick?: () => void;
}

const ProductCard: FC<ProductCardProps> = ({ product, onClick }) => {
    const t = useTranslations("buttons")
    if (!product) return
    return (
        <Link href={`/products/${product?.id}`} onClick={onClick} className='h-fit'>
            <div className="productCard w-full select-none  p-[12px] md:p-[20px] rounded-[8px] overflow-hidden bg-white h-[330px] md:h-[475.5px]">
                <div className="grid h-full grid-rows-[144px_1fr_0.5fr_0.1fr] md:grid-rows-[273.5px_1fr_0.2fr_0.2fr] gap-y-1 md:gap-y-2 font-norms text-customPrimary">
                    <div className='relative rounded-[10px] overflow-hidden'>
                        {
                            product?.variants[0].oldPrice ?
                                <DiscountDecor 
                                    className='text-sm'
                                    discount={`-${
                                        ((parseFloat(product?.variants[0].oldPrice as string) - product?.variants[0].price) * 100 / parseFloat(product?.variants[0].oldPrice as string)).toFixed(0)
                                    }%`}
                                /> :
                            product.onFresh ?
                                <DiscountDecor 
                                    className='text-sm'
                                    discount="Новинка"
                                /> :
                            product.onBestsellers ?
                                <DiscountDecor 
                                    className='text-sm'
                                    discount="Хит"
                                /> : null
                        }
                        <Image 
                            src={product?.images[0]?.url}
                            fill={true}
                            style={{objectFit: 'cover'}}
                            className='transition-transform duration-300 aspect-square'
                            alt='product'
                        />
                    </div>
                    <div className='flex flex-col'>
                        <h1 className='font-bold text-base md:text-lg text-hidden'>{ product?.variants[0].title }</h1>
                        {/* <p className='text-customSecondary text-sm md:text-base mb-1 md:mb-2 text-hidden'>
                            {
                                product?.variants[0].subtitle &&
                                    product.variants[0].subtitle
                                    // product?.variants[0].subtitle?.length > 16 ? 
                                    //     `${product?.variants[0].subtitle?.slice(0, 16)}...` :
                                    //     product?.variants[0].subtitle
                            }
                        </p> */}
                        <AvailabilityTag availability={product?.variants[0].availability} />
                    </div>
                    <div className='flex flex-col-reverse md:flex-row items-start md:items-center gap-x-4'>
                        <div className='font-bold text-lg'>{product?.variants[0].price.toLocaleString("ru")} сум</div>
                        <div
                      className="text-[14px] leading-none text-lightGray"
                      style={{ display: "flex", flexWrap: "nowrap" }}
                    >
                      <div className="text-[14px] leading-none text-lightGray line-through mr-1">
                        {product?.variants[0]?.oldPrice && (
                          <>
                            {product?.variants[0].oldPrice.toLocaleString("ru")}{" "}
                          </>
                        )}
                      </div>
                      {product?.variants[0]?.oldPrice && <> сум </>}
                    </div>
                    </div>

                    <Button 
                        variant="primary"
                        className='text-xs md:text-base h-7 md:h-10'
                        size="full"
                        disabled={product?.variants[0].availability === $Enums.AvailablityStatus.OUT_OF_STOCK}
                    >{product?.variants[0].availability === $Enums.AvailablityStatus.OUT_OF_STOCK ? t("OUT_OF_STOCK") : t("buy")}</Button>

                </div>
            </div>
        </Link>
    )
}

export default ProductCard