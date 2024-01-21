import {FC} from 'react'

import Image from 'next/image';
import {Button} from '@/components/ui/button';
import Rating from '@/components/rating/Rating';
import {CheckItem, TextItem} from './tabsUi';
import {FullProduct, FullVariant} from '@/types/product';
import dayjs from "dayjs";
import {useTranslations} from 'next-intl';
import MakeOrder from '../(buy)/MakeOrder';
import useActiveVariant from '@/hooks/useActiveVariant';
import ShowReviews from './ShowReviews';
import BuyMakeOrder from '../(buy)/BuyMakeOrder';

interface DescriptionProps {
    product: FullProduct;
    landing: FullProduct['landing'] | null,
    setReviewsTabActive: () => void
}

const Description: FC<DescriptionProps> = ({landing, product, setReviewsTabActive}) => {
    if (!landing) return;
    const {variant} = useActiveVariant(product)
    const t = useTranslations("warranty");

    const reviewShowBuyMakeOrder = landing.reviewId ? true : false;


    return (
      <>
        <div className='flex flex-col gap-y-[27px] md:gap-y-[40px] lg:gap-y-[40px] md:pt-4 max-w-[1100px]'>
            <div className='grid grid-cols-1 md:grid-cols-[492px_1fr] gap-x-[90px] items-center'>
                {landing.isVideo ?
                    <div
                        className='max-w-full relative w-full rounded-[10px] overflow-hidden'>
                        <video className='aspect-square w-full h-full object-cover' controls={true}>
                            <source className={'rounded-[10px]'} src={landing.image1} type="video/mp4"/>
                        </video>
                    </div>
                    :
                    // <div className='max-w-full relative w-full h-auto aspect-square overflow-hidden'>
                        <img
                            src={landing.image1}
                            className='w-full rounded'
                            alt={'Фото'}
                        />
                    // </div>
                }
                <div className='flex flex-col pt-4 md:pt-0 gap-y-[20px] md:gap-y-[30px] lg:gap-y-[30px]'>
                    <div
                        className='font-dela text-[20px] md:text-[25px] lg:text-[25px] w-fit cursor-default text-customPrimary'>
                        {landing.title}
                    </div>
                    {landing.subtitle &&
                        <div
                            className='font-norms text-[16px] w-fit cursor-default text-customPrimary'>
                            {landing.subtitle}
                        </div>
                    }
                    <ul className='flex flex-col gap-y-[20px]'>
                        {
                            [
                                landing.featureItem_1,
                                landing.featureItem_2,
                                landing.featureItem_3
                            ].map((item, i) => (
                                <CheckItem
                                    key={i}
                                    title={item as string}
                                />
                            ))
                        }
                    </ul>
                </div>
            </div>

            <BuyMakeOrder
              product={product}
              makeOrderOnly={false}
              inDescription={true}
            />


            <div className='flex flex-col-reverse md:grid grid-cols-[1fr_492px] gap-x-[90px] items-center'>
                <ul className='pt-4 md:pt-0 flex flex-col gap-y-[30px] font-light'>
                    {
                        [
                            {title: landing.description_title_1, description: landing.description_text_1},
                            {title: landing.description_title_2, description: landing.description_text_2},
                            {title: landing.description_title_3, description: landing.description_text_3},
                        ].map((item, i) => (
                            <TextItem
                                key={i}
                                title={item.title as string}
                                descr={item.description as string}
                            />
                        ))
                    }
                </ul>
                {/* <div className='max-w-full relative w-full aspect-square overflow-hidden'> */}
                        <img
                            src={landing.image2}
                            className='w-full rounded'
                            alt={'Фото'}
                        />
                    {/* </div> */}

            </div>
            {landing.reviewId &&
                <>
                <div className='relative grid grid-cols-1 md:grid-cols-[400px_2fr] items-end mb-[340px] md:mb-0 lg:mb-0'>
                    <div className='relative md:w-full h-[350px] md:h-[400px] rounded-[10px] overflow-hidden'>
                        {
                            landing.image3 &&
                            <Image
                                src={landing.image3}
                                fill={true}
                                style={{objectFit: 'cover'}}
                                className='transition-transform duration-300'
                                alt='product'
                            />
                        }

                    </div>
                    <Review
                        product={product}
                        variant={variant}
                        name={landing?.review?.name as string}
                        date={dayjs(Number(landing?.review?.createdAt)).format('DD.MM.YYYY')}
                        review={landing.review?.comment as string}
                        rating={landing.review?.rating as number}
                        setReviewsTabActive={setReviewsTabActive}
                        showBuyMakeOrder={reviewShowBuyMakeOrder}
                    />
                </div>
                <BuyMakeOrder
                  product={product}
                  makeOrderOnly={false}
                  inDescription={true}
                />
                </>
            }

            {landing.block_4 &&

              <>
              <div className='grid grid-cols-1 md:grid-cols-[492px_1fr] gap-x-[90px] items-center'>
                  {landing.isVideo4 ?
                      <div
                          className='max-w-full relative w-full rounded-[10px] overflow-hidden'>
                          <video className='aspect-square w-full h-full object-cover' controls={true}>
                              <source className={'rounded-[10px]'} src={landing.image4 as string} type="video/mp4"/>
                          </video>
                      </div>
                      :
                      // <div className='max-w-full relative w-full h-auto aspect-square overflow-hidden'>
                          <img
                              src={landing.image4 as string}
                              className='w-full rounded'
                              alt={'Фото'}
                          />
                      // </div>
                  }
                  <div className='flex flex-col pt-4 md:pt-0 gap-y-[20px] md:gap-y-[30px] lg:gap-y-[30px]'>
                      <div
                          className='font-dela text-[20px] md:text-[25px] lg:text-[25px] w-fit cursor-default text-customPrimary'>
                          {landing.title_4}
                      </div>
                      {landing.subtitle_4 &&
                          <div
                              className='font-norms text-[16px] w-fit cursor-default text-customPrimary'>
                              {landing.subtitle_4}
                          </div>
                      }
                      <ul className='flex flex-col gap-y-[20px]'>
                          {
                              [
                                  landing.featureItem_4_1,
                                  landing.featureItem_4_2,
                                  landing.featureItem_4_3
                              ].map((item, i) => (
                                  <CheckItem
                                      key={i}
                                      title={item as string}
                                  />
                              ))
                          }
                      </ul>
                  </div>
              </div>

              <BuyMakeOrder
                product={product}
                makeOrderOnly={false}
                inDescription={true}
              />
              </>

            }

            <div className="font-dela text-[25px] w-full text-center uppercase text-customPrimary">{t("title")}</div>
            <div className='grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr] gap-x-[33px] gap-y-[20px] items-center'>
              <div className="flex flex-col productCard px-[13px] md:px-[15px] lg:px-[15px] pt-[32px] pb-[24px] gap-y-[27px] md:h-[480px] lg:h-[480px] rounded-[10px]">
                <div className="flex justify-center w-full">
                  <img
                    className="w-[225px] h-[225px]"
                    src="/images/warranty/warranty_1.png"
                  />
                </div>
                <div className="w-full text-center font-dela text-[17px]">{t("title_1")}</div>
                <div className="w-full text-[16px] text-customPrimary">
                  <b>{t("text_1_strong")}</b><br />
                  {t("text_1")}
                </div>
              </div>

              <div className="flex flex-col productCard px-[13px] md:px-[15px] lg:px-[15px] pt-[32px] pb-[24px] gap-y-[27px] md:h-[480px] lg:h-[480px] rounded-[10px]">
                <div className="flex justify-center w-full">
                  <img
                    className="w-[225px] h-[225px]"
                    src="/images/warranty/warranty_2.png"
                  />
                </div>
                <div className="w-full text-center font-dela text-[17px]">{t("title_2")}</div>
                <div className="w-full text-[16px] text-customPrimary">
                  {t("text_2")}<b>{t("text_2_strong")}</b>{t("text_2_last")}
                </div>
              </div>

              <div className="flex flex-col productCard px-[13px] md:px-[15px] lg:px-[15px] pt-[32px] pb-[24px] gap-y-[27px] md:h-[480px] lg:h-[480px] rounded-[10px]">
                <div className="flex justify-center w-full">
                  <img
                    className="w-[225px] h-[225px]"
                    src="/images/warranty/warranty_3.png"
                  />
                </div>
                <div className="w-full text-center font-dela text-[17px]">{t("title_3")}</div>
                <div className="w-full text-[16px] text-customPrimary">
                  {t("text_3")}<b>{t("text_3_strong")}</b>{t("text_3_last")}
                </div>
              </div>
            </div>

            <BuyMakeOrder
              product={product}
              makeOrderOnly={false}
              inDescription={true}
            />

        </div>
      </>
    )
}

interface IRewiew {
    name: string;
    date: string;
    review: string;
    rating: number;
    product: FullProduct;
    variant: FullVariant | null;
    setReviewsTabActive: () => void;
    showBuyMakeOrder: boolean;
}

const Review: FC<IRewiew> = ({name, date, review, rating, product, variant, setReviewsTabActive, showBuyMakeOrder = false}) => {
    const t = useTranslations("buttons")
    return (
        <>
            <div
                className='absolute min-h-[200px] md:h-auto pr-4 pt-4 pb-9 -bottom-[300px] md:bottom-[75px] justify-self-end mb-11 w-full productCard select-none md:px-[32px] md:pt-[63px] md:pb-[59px] lg:px-[32px] lg:pt-[63px] lg:pb-[59px] rounded-[8px] overflow-hidden bg-white md:max-w-[620px]'>
                <div className='grid justify-items-center text-center grid-cols-1 md:grid-cols-[1fr_2fr] justify-center gap-x-[52px] gap-y-[22px] md:gap-y-0 lg:gap-y-0'>
                    <div className='flex flex-col md:gap-y-[11px] lg:gap-y-[11px]'>
                        <div className='flex flex-row items-center gap-x-[23px] justify-between'>
                            <h3 className='font-bold text-[24px] text-customPrimary'>{name}</h3>
                            <span className='text-lightGray text-[16px] pt-[4px]'>{date}</span>
                        </div>
                        <Rating
                            rating={rating}
                            type="display"
                            className='text-base'
                        />
                    </div>
                    <p className='justify-self-end max-w-[90%] md:max-w-[300px] text-[18px] text-customPrimary text-left'>
                        {
                            review.length > 87 ? `${review.slice(0, 90)}...` : review
                        }
                    </p>
                </div>

            </div>
            <div className='absolute -bottom-[320px] md:bottom-[50px] right-0 flex flex-col gap-y-2 w-[100%] md:w-[20vw] text-center md:text-left lg:text-left'>
                <ShowReviews onClick={setReviewsTabActive} />

            </div>

        </>
    )
}

export default Description
