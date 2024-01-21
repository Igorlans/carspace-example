"use client"

import {FC, useMemo, useEffect} from 'react'
import {useState} from 'react';

import Slider from '@/components/slider/Slider'
import {SwiperSlide} from 'swiper/react';
import Image from 'next/image';
import SectionTitle from '@/components/sectionTitle/SectionTitle';
import Rating from '@/components/rating/Rating';
import AvailabilityTag from '@/components/ui/custom/AvailabilityTag';
import ProductSelect from '../ProductSelect';
import HorisontalProductCard from '@/components/cards/HorisontalProductCard';
import ClientProvider from '@/providers/client-provider'
import DiscountDecor from '@/components/ui/custom/DiscountDecor';
import {FullProduct, FullVariant} from '@/types/product';
import useActiveVariant from '@/hooks/useActiveVariant';
import MakeOrder from './MakeOrder';
import { useTranslations } from 'next-intl';
import ProductSlider from './ProductSlider';
import ProductRating from './ProductRating';

interface BuyProps {
    product: FullProduct
}

const Buy: FC<BuyProps> = ({product}) => {
    const t = useTranslations("product")
    const { handleVariantChange, variant, defaultVariant } = useActiveVariant(product)

    const [variantView, setVariantView] = useState<boolean>(false)
    const [ratingStarSize, setRatingStarSize] = useState<string>('35px')

    const discountValue = useMemo(() => {

        const curVariant = variant ? variant : defaultVariant;

        const variantDiscount: FullVariant = product.variants.find(item => item.id === curVariant.id)!
        if (!!!variantDiscount?.oldPrice) return null

        const discount = ((parseFloat(variantDiscount.oldPrice as string) - variantDiscount.price) * 100 / parseFloat(variantDiscount.oldPrice as string)).toFixed(0)
        return discount
    }, [variant, defaultVariant])
    // }, [variant.id])

    useEffect(() => {
      const starSize = window.screen.width > 480 ? "35px" : "27px";
      setRatingStarSize(starSize);
    }, [])




    return (
        <div className='container grid justify-items-stretch grid-cols-1 md:grid-cols-[1fr_1.6fr] productPageGap  md:min-h-[700px]'>
            <div className='product-pagination relative  min-h-[100vw] md:min-h-[1px] h-[143vw] sm:h-[750px] md:h-[750px] lg:h-[750px] w-[100vw-2rem] sm:w-[100vw] md:w-[400px] lg:w-[500px] overflow-hidden'>
                {
                    variantView &&
                    <VariantImage variant={variant} onClick={() => setVariantView(false)} discount={discountValue}/>
                }
                <ProductSlider product={product} discountValue={discountValue}/>
            </div>

            <div className='md:max-w-[672px]  flex flex-col gap-y-2 font-norms text-customPrimary'>
                <div className='flex flex-col lg:gap-y-[14px] md:gap-y-[14px] gap-y-[20px] '>
                    <SectionTitle
                        align='left'
                        className='text-xl md:text-[28px] lg:text-[28px] pb-[14px] pt-4 md:pt-0 md:pb-0'
                    >
                        {variant ? variant?.title : defaultVariant.title}
                    </SectionTitle>
                    <p className="text-[16px]">{variant ? variant?.subtitle : defaultVariant.subtitle}</p>
                </div>

                <div className='pt-[20px] md:pt-[26px] lg:pt-[26px] flex flex-col gap-y-[15px]'>
                    <AvailabilityTag availability={variant ? variant?.availability : defaultVariant.availability} />
                    <p>{t("articul")}: {variant ? variant?.sku : defaultVariant.sku}</p>
                    <p>{t("category")}: {product.category.title}</p>
                </div>

                <div className='pt-[14px] md:pt-[30px] lg:pt-[30px]'>
                    {
                        product.reviews.length > 0 &&
                        <Rating
                            type="product"
                            styles={{width: ratingStarSize}}
                            rating={
                                product.reviews.reduce((acc, item) => acc + item.rating, 0) / product.reviews.length
                            }
                        />
                    }
                </div>

                <div className='pt-[18px] md:pt-[15px] lg:pt-[15px] font-norms flex flex-col-reverse md:flex-row lg:flex-row md:items-center lg:items-center gap-x-4'>
                    {
                        (variant?.oldPrice || defaultVariant.oldPrice) &&
                        <div className='font-dela text-[24px] text-lightGray line-through'>
                            {variant ? variant.oldPrice.toLocaleString("ru") : defaultVariant.oldPrice.toLocaleString("ru")} сум
                        </div>
                    }
                    <div className='font-dela text-[28px] md:text-[36px] lg:text-[36px] text-customPrimary pb-[10px] md:pb-0 lg:pb-0'>
                        {variant ? variant?.price.toLocaleString("ru") : defaultVariant?.price.toLocaleString("ru")} сум
                    </div>
                </div>

                {
                    product.variants.length > 1 &&
                    <>
                      <p className="pt-[22px] pb-[20px] md:pt-[30px] lg:pt-[30px] font-bold text-[20px]">{t("variants")}</p>
                      <ProductSelect
                          pagination={product}
                          activeVariant={variant?.id}
                          onVariantChange={(id) => {
                              handleVariantChange(id)
                              setVariantView(true)
                          }}
                      />
                    </>
                }

                <div className='pt-[22px] md:pt-[25px] lg:pt-[25px] flex flex-col gap-y-[12px]'>
                    <MakeOrder product={product} variant={variant}/>

                    <div className='flex flex-col gap-y-3 pt-[8px] md:pt-0 lg:pt-0'>
                        {
                            product.relatedProducts.length > 0 &&
                            <>
                                <div
                                    className='font-bold text-xl text-customPrimary pb-1 border-b border-b-customPrimary text-[18px] md:text-[20px] lg:text-[20px]'>
                                    {t("alsoBuy")}
                                </div>
                                {
                                    product.relatedProducts.map(item => (
                                            <HorisontalProductCard
                                                //@ts-ignore
                                                orderItem={item}
                                            />
                                        )
                                    )
                                }
                            </>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

const VariantImage = ({variant, onClick, discount}: { variant: FullVariant | null, onClick: () => void, discount: string | null }) => {
    if (!variant?.image) return;

    return (
        <div className='z-10 absolute w-full h-full top-0 left-0'
             onClick={onClick}
        >
            <div className='aspect-square relative w-full h-[125vw] md:h-[530px] lg:h-[668px] rounded-[10px] overflow-hidden bg-[#fff]'>
                <Image
                    src={variant?.image.url}
                    title={variant?.image?.name!}
                    fill={true}
                    style={{objectFit: 'contain'}}
                    alt={variant?.image?.name!}
                />
                {
                    discount &&
                    <DiscountDecor
                        discount={`-${discount}%`}
                    />
                }
            </div>
        </div>
    )
}

export default Buy
