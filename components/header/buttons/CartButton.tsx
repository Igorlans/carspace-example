"use client"

import {FC, useEffect, useState} from 'react'
import { useContext } from 'react'
import { LuShoppingCart, LuTrash2, LuX } from 'react-icons/lu'
import Image from 'next/image'
import EmptyList from '@/components/ui/custom/EmptyList'
import { useRouter } from 'next-intl/client'
import Link from 'next/link'

import { CartContext } from '@/providers/cart-provider'
import { Button } from '@/components/ui/button'
import { OrderItemValues } from '@/types/order'
import {gtmService} from "@/services/gtm/gtmService";
import { useTranslations } from 'next-intl'

interface CartButtonProps {
  
}

const CartButton: FC<CartButtonProps> = ({ }) => {
  const cart = useContext(CartContext)
  const router = useRouter()
  const t = useTranslations("buttons")
    const [open, setOpen] = useState(false)
    useEffect(() => {
        if (open) {
            if (cart?.orders) {
                gtmService.viewCart(cart.orders)
            }
        }
    }, [open])

    useEffect(() => {
      if (cart?.isCartOpen) setOpen(cart?.isCartOpen)
    }, [cart?.isCartOpen])

    useEffect(() => {
      window.scrollTo(0, 0)
      const content = document.getElementById("page_content")
      if (!content) return
      if (open) {
        document.body.classList.add("noScroll")
        content.classList.add("content-hide")
      }
      else {
        content.classList.remove("content-hide")
        document.body.classList.remove("noScroll")
      }
    }, [open])


    const handleClose = (e: any) => {
      if (e.target.id === "page_content") {
        setOpen(false)
        cart?.setCartOpen(false)
      }
    }
    useEffect(() => {
      if (!open) return
      document.addEventListener("click", handleClose)
      return () => document.removeEventListener("click", handleClose)
    }, [open])

    const handleToOrder = () => {
      const content = document.getElementById("page_content")
      if (!content) return
      router.push("/order")
      setOpen(false)
      content.classList.remove("content-hide")
    }

  return (
    <div className='relative'>
      <div onClick={() => {
        setOpen(state => !state)
        cart?.setCartOpen(false)
      }} className='w-fit relative mr-2'>
        <LuShoppingCart className="w-[24px] h-[24px]" />
        {
          cart?.orders &&
            cart.orders.length > 0 &&
            <div className='absolute -top-2 flex items-center justify-center pt-[1px] pb-[1px] -right-4 w-5 h-5 bg-customPrimary rounded-full text-xs text-center font-norms text-white font-bold'>
                {
                  cart?.orders.length
                }
            </div>
        }
      </div>
      <div className='cartAnimate bg-white rounded-md border bg-popover p-1 text-popover-foreground shadow-m max-w-[90vw] w-max md:min-w-[295px] md:max-w-[330px] overflow-hidden flex flex-col py-4 gap-y-2 px-2 absolute z-50 right-0 top-11'
        style={{ display: open ? "block" : "none"}}
      >
        <div className='w-full flex items-center justify-between'>
          <h1 className="font-dela text-base md:text-lg uppercase text-customPrimary">Корзина</h1>
          <div
            className='cursor-pointer'
            onClick={() => {
              setOpen(false)
              cart?.setCartOpen(false)
            }}
          >
            <LuX />
          </div>
        </div>
        <div className='flex flex-col py-4 gap-y-2 max-h-[450px] overflow-y-scroll hideScrollBar'>
                  {
                      cart?.orders?.length === 0 ? 
                      <EmptyList message='В корзине пусто' className='px-11' /> :
                      cart?.orders.map(item => (
                        <div key={item.variantId} className='relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50'>
                          <CartItem
                              cartItem={item}
                          />
                        </div>
                      ))
                  }
                </div>
                <Button
                  variant="primary" 
                  size="full"
                  className='h-8 min-h-[32px]'
                  disabled={cart?.orders.length === 0}
                  onClick={handleToOrder}
                >{t("makeOrder")}</Button>
      </div>
    </div>
  )
}

interface CartItemProps {
    cartItem: OrderItemValues
}

const CartItem: FC<CartItemProps> = ({ cartItem }) => {
    const cart = useContext(CartContext)
    if (!cartItem) return
    return (
        <div className='relative grid grid-cols-[0.8fr_1.5fr] items-center gap-x-1 md:gap-x-4 w-full border-b border-lightGray pb-3'>
              <div
                className='cursor-pointer absolute top-2 -right-2'
                onClick={() => cart?.deleteOrder(cartItem?.variantId!)}
              >
                <LuTrash2 className="text-lightGray" />
              </div>
            <div className="aspect-square relative rounded-[10px] max-h-[80px] overflow-hidden shrink-0">
              <Image
                src={cartItem.image?.url}
                fill={true}
                style={{ objectFit: "cover" }}
                className=""
                alt="product"
              />
            </div>
            <div className="flex flex-col justify-between text-left gap-y-1 md:gap-y-0">
              <Link href={`/products/${cartItem.id}`}>
                <h1 className="font-dela text-xs md:text-base text-hidden">{ cartItem?.title }</h1>
              </Link>
                <div className="w-full grid grid-cols-2 items-center justify-between mt-1">
                  {
                    cartItem?.oldPrice &&
                      <div className="text-[10px] md:text-xs text-lightGray line-through pr-1">
                        { cartItem?.oldPrice.toLocaleString("ru") } сум
                      </div>
                  }
                  <div className="text-xs">{ cartItem?.price.toLocaleString("ru") } сум</div>
                </div>
            </div>
        </div>
    )
}

export default CartButton