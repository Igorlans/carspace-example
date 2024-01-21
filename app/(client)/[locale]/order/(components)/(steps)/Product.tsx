'use client'

import {FC, useEffect, useMemo, useState} from 'react'
import { useContext } from 'react'

import { UseFormReturn } from 'react-hook-form'
import type { FullPromocode, OrderValues } from '@/types/order'
import { ActiveStep } from '../Steps'

import toast from 'react-hot-toast'

import { Button } from '@/components/ui/button'
import MainCardSlider from '@/app/(client)/[locale]/(components)/(mainSlider)/MainCardSlider'
import { Form } from '@/components/ui/form'
import FormInput from '@/components/ui/custom/FormInput'
import type { activeStepType } from '../Steps'
import { CartContext } from '@/providers/cart-provider'
import {useLocale, useTranslations} from 'next-intl'
import StepsProvider from './steps-provider'
import type { languageInputValues } from "@/types/types"
import {RouterOutput, trpc} from '@/app/_trpc/client'
import {Skeleton} from "@/components/ui/skeleton";

interface ProductProps {
  form: UseFormReturn<OrderValues>;
  products: RouterOutput["product"]["getProductByType"];
  promocodes: FullPromocode
  locale: languageInputValues;
  setActiveStep: (step: activeStepType) => void
}

const Product: FC<ProductProps> = ({ form, setActiveStep, promocodes }) => {
    const t = useTranslations("products"),
          button =  useTranslations("buttons"),
          validation = useTranslations("validation"),
          promo = useTranslations("promocode")

    const formValues: OrderValues = form.watch()
    const cart = useContext(CartContext)
    const isPromocode = formValues.promocode !== ""

    const locale = useLocale()

    const uniqueCategories: string[] = useMemo(() => {
        const categories = cart?.orders?.map(item => item.categoryId) || []
        return [...new Set(categories)]
    }, [cart?.orders])
    const {
        data: suggestedProducts,
        isFetching
    } = trpc.product.getSuggestedProductsByCategories.useQuery({
        categories: uniqueCategories,
        language: locale as 'uz' | 'ru'
    }, {
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        retry: false,
        staleTime: 60 * 60 * 24,
    })

    const filteredSuggestedProducts = useMemo(() => {
        return suggestedProducts?.filter(product => !cart?.orders.some(orderItem => product.id === orderItem.id))
    }, [suggestedProducts])

    const setPromo = () => {
      if (cart?.promocode) return toast.error(validation("alredySet"));

      const dbPromo = promocodes?.find(item => item.code === formValues.promocode && item.isActive) ?? null;
      if (!dbPromo) return toast.error(validation("invalidPromo"));

      else {
        cart?.setPromocode({
          type: dbPromo.type,
          value: dbPromo.value,
          code: dbPromo.code
        })
        return toast.success(validation("setPromo"))
      } 
    }
    return (
      <>    
        <StepsProvider>
          <div className='productCard select-none max-h-[240px] p-[12px] md:p-[20px] rounded-[8px] overflow-hidden bg-white h-fit'>
            <div className='flex flex-col w-full h-full justify-between gap-y-4'>
              {/* <div className='w-full  border-customPrimary border-b pb-1 flex items-end justify-between'>
                <span className='font-bold'>{t("amount")}</span>
                <div className='flex items-center w-fit gap-x-2'>
                  {
                    cart?.promocode && cart.orders.length > 0 &&
                      <div className='font-bold tracking-wide text-sm text-lightGray line-through'>{
                        cart?.orders.reduce((acc, item) => {
                          return acc + parseFloat(item.price as string) * parseFloat(item.quantity as string)
                        }, 0).toLocaleString("ru")
                      } сум</div>
                  }
                  <span className='text-lg font-norms'>
                    {
                      cart?.totalPrice.toLocaleString("ru")
                    } сум
                  </span>
                </div>
              </div> */}
              <div className='w-full flex flex-col gap-y-1 pt-4 md:pt-0'>
                <span className='text-base font-norms'>
                  {
                    `${t("promocode")}?`
                  }
                </span>
                <Form {...form}>
                <form className='flex flex-col gap-y-4'>
                    <FormInput 
                      name="promocode"
                      control={form.control}
                      label=''
                    />
                </form>
              </Form>
                    {
                      cart?.promocode &&
                        <div className='mt-2'>
                          { promo("promo") } "{ cart?.promocode.code }" { promo("sale") } {
                            cart?.promocode.type === "FIXED" ? 
                              `${cart?.promocode.value.toLocaleString("ru")} сум`  :
                              `${cart?.promocode.value}%`
                          } { promo("set") }
                        </div>
                    }
              </div>
              <Button
                  onClick={() => {
                    if (isPromocode && !cart?.promocode) setPromo()
                    else setActiveStep(ActiveStep.data)
                  }}
                  disabled={cart?.orders.length === 0}
                  variant="primary"
                  className='text-xs md:text-base h-9 md:h-10 mt-4 md:mt-0'
                  size="full"
              >
                {
                  isPromocode && !cart?.promocode ? button("setPromo") : button("nextStep")
                }
              </Button>
            </div>
          </div>
        </StepsProvider>

        <div className='flex flex-col gap-y-2 md:gap-y-4'>
          <div className='container'>
            <div className='w-full font-norms font-bold text-xl md:text-2xl border-customPrimary border-b pb-1 flex items-center justify-between'>
                {
                  t("asloLike")
                }
            </div>
          </div>
          <div className='md:container'>
              {isFetching
                  ?
                  <div className="w-full grid grid-cols-4 gap-5">
                      {[...Array(4)].map(item => <Skeleton className="h-[400px]" />)}
                  </div>
                  :
                  <MainCardSlider
                      slides={filteredSuggestedProducts || []}
                  />
              }

          </div>
        </div>
      </>
    )
}

export default Product