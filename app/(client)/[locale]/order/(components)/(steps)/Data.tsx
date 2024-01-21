'use client'
import { FC } from 'react'
import { useContext } from 'react'
import { UseFormReturn } from 'react-hook-form'
import type { OrderValues } from '@/types/order'
import type { activeStepType } from '../Steps'

import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import FormInput from '@/components/ui/custom/FormInput'
import { useTranslations } from 'next-intl'
import StepsProvider from './steps-provider'
import { CartContext } from '@/providers/cart-provider'


interface DataProps {
  form: UseFormReturn<OrderValues>
  setActiveStep: (step: activeStepType) => void;
  handleSubmit: () => void
}

const Data: FC<DataProps> =  ({ form, handleSubmit }) => {
  const t = useTranslations("yourData"),
        button = useTranslations("buttons");
  const cart = useContext(CartContext)


  return (
    <StepsProvider>
      <div className='productCard select-none max-h-[400px] p-[12px] md:p-[20px] rounded-[8px] overflow-hidden bg-white'>
            <div className='flex flex-col w-full h-full justify-between '>
              <h3 className='font-dela text-lg uppercase pb-6'>{t("enterYourData")}</h3>
              <Form {...form}>
                <form className='flex flex-col gap-y-4'>
                    <FormInput
                      name="name"
                      control={form.control}
                      label={t("name")}
                    />
                    <FormInput
                      name="phone"
                      control={form.control}
                      label={t("phoneNumber")}
                    />
                </form>
              </Form>
              <Button
                  onClick={handleSubmit}
                  disabled={cart?.orders.length === 0}
                  variant="primary"
                  className='text-xs md:text-base h-8 md:h-10 mt-6'
                  size="full"
              >{button("makeOrder")}</Button>
            </div>
          </div>
    </StepsProvider>
  )
}

export default Data
