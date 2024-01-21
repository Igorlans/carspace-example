"use client"

import {FC, useEffect} from 'react'
import {useState, useContext} from 'react'
import {CartContext} from '@/providers/cart-provider'

import StepsControls from './StepsControls'
import Product from './(steps)/Product'
import Data from './(steps)/Data'
import Done from './(steps)/Done'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { FullPromocode, OrderValues } from '@/types/order'
import type { languageInputValues } from "@/types/types"
import { orderSchemaFunc } from '@/types/order'
import {toast} from 'react-hot-toast'
import {RouterOutput, trpc} from "@/app/_trpc/client";
import {gtmService} from "@/services/gtm/gtmService";

export enum ActiveStep {
    product = "product",
    data = "data",
    done = "done"
}

export type activeStepType = keyof typeof ActiveStep

interface StepsProps {
  products: RouterOutput["product"]["getProductByType"]
  promocodes: FullPromocode;
  locale: languageInputValues
}

const Steps: FC<StepsProps> = ({locale, products, promocodes}) => {
    const [activeStep, setActiveStep] = useState<activeStepType>(ActiveStep.product);

    const cart = useContext(CartContext)

    const orderSchcema = orderSchemaFunc()
    const defaultValues: OrderValues = {
        name: "",
        phone: "",
        promocode: "",totalPrice: 0,
        items: []
    }
    const form = useForm<OrderValues>({
        resolver: zodResolver(orderSchcema),
        defaultValues,
        mode: "onBlur"
    })

    const mutateOptions = {
        onMutate: () => {
            toast.loading("Оформление заказа", {id: 'loading'})
        },
        onSuccess: () => {
            if (cart?.orders) {
                gtmService.purchase(cart?.orders)

            }
            toast.success("Спасибо за заказ");
            setActiveStep(ActiveStep.done);
            cart?.resetCart();
            form.reset();
        },
        onSettled: () => {
            toast.dismiss('loading')
        },
        onError: () => {
            toast.error("Ошибка. Попробуйте еще раз")
        }
    }
    const makeOrder = trpc.order.makeOrder.useMutation(mutateOptions)

    async function orderProducts(data: OrderValues) {
        if (cart?.orders.length === 0) return toast.error("В корзине пусто")
        try {
            makeOrder.mutate({
                ...data,
                items: cart?.orders!,
                totalPrice: cart?.totalPrice!})

        } catch (e: any) {
            console.log(e);
        }
    }

  function renderActivestep (step: activeStepType): React.ReactNode {
    switch (step) {
      case "product":
        return <Product 
                  form={form}
                  promocodes={promocodes}
                  locale={locale} 
                  products={products}
                  setActiveStep={(step) => setActiveStep(step)} 
                />;
      case "data":
        return <Data form={form} setActiveStep={(step) => setActiveStep(step)} handleSubmit={form.handleSubmit(orderProducts)} />;
      case "done":
        return <Done form={form} />;
      default:
        return <Product 
                  form={form}
                  promocodes={promocodes}
                  locale={locale} 
                  products={products}
                  setActiveStep={(step) => setActiveStep(step)} 
                />;
        }
    }

    const viewStep = renderActivestep(activeStep)


    useEffect(() => {
        if (cart?.orders?.length) {
            gtmService.beginCheckout(cart.orders)
        }
    }, [])


    return (
        <div>
            <div className='container'>
                <StepsControls
                    setActiveStep={(step) => {
                        if (cart?.orders.length === 0) return
                        setActiveStep(step)
                    }}
                    activeStep={activeStep}
                    isFormValid={form.formState.isValid}
                />
            </div>

            <div>
                {viewStep}
            </div>
        </div>
    )
}

export default Steps