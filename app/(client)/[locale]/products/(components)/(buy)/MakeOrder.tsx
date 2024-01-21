import { FC } from 'react'
import { useContext } from 'react'

import { Button } from '@/components/ui/button'
import { CartContext } from '@/providers/cart-provider';
import { FullProduct, FullVariant } from '@/types/product';
import { useRouter } from 'next-intl/client';
import { toast } from 'react-hot-toast';
import {gtmService} from "@/services/gtm/gtmService";
import { useTranslations } from 'next-intl';
import { $Enums } from '@prisma/client';


interface MakeOrderProps {
  variant: FullVariant | null
  product: FullProduct
  makeOrderOnly?: boolean,
  inDescription?: boolean
}

const MakeOrder: FC<MakeOrderProps> = ({ product, variant, makeOrderOnly = false, inDescription = false }) => {
    const cart = useContext(CartContext)
    const router = useRouter();
    const t = useTranslations("buttons")
    const tV = useTranslations("validation")

    const isInCart = !!cart?.orders.find(item => item.variantId === variant?.id)

    function saveProduct () {
      if (isInCart) return toast.error("Товар уже в корзине")
      if (!product || !variant || !variant) return
      try {
        cart?.saveOrders({
          id: product?.id,
          variantId: variant?.id,
          crmId: variant?.crmId,
          sku: variant?.sku,
          title: variant?.title!,
          subtitle: variant?.subtitle!,
          onFresh: product?.onFresh,
          onBestsellers: product?.onBestsellers,
          categoryId: product?.categoryId,
          //@ts-ignore
          image: variant?.image,
          price: variant?.price!,
          oldPrice: variant?.oldPrice,
          quantity: 1
        })

        if (variant) {
            gtmService.addToCart(product, variant)
        }
        } catch (e) {
          console.log(e);
          toast.error("Ошибка")
        }
    }
    function addToCart () {

      // Makes check on selected variant
      if(!variant){
        return toast.error(tV("variantNotSelected"));
      }

      saveProduct()
      cart?.setCartOpen(true)
    }

    function makeOrder () {

      // Makes check on selected variant
      if(!variant){
        return toast.error(tV("variantNotSelected"));
      }

      if (isInCart) {
        router.push("/order")
      } else {
        saveProduct()
        router.push("/order")
      }
    }

    const inDescriptionStyles = inDescription ? ' flex-col md:flex-row lg:flex-row justify-between gap-x-[12px] ' : ' flex-col ';
    const inDescriptionStylesButton = inDescription ? ' w-full md:w-[50%] lg:w-[50%] ' : ' w-full ';

    return (
        <div className={String('flex gap-y-[12px]').concat(inDescriptionStyles).concat(makeOrderOnly === false ? "" : " md:hidden ")}>
            <Button
              variant="primary"
              className={String('rounded-[5px] h-[60px] text-[18px]').concat(inDescriptionStylesButton)}
              size={inDescription ? null : "full"}
              onClick={makeOrder}
              disabled={variant?.availability === $Enums.AvailablityStatus.OUT_OF_STOCK}
            >{t("makeOrder")}</Button>
            {

            makeOrderOnly === false &&
            <>
              <div className={String('rounded-[5px] border border-customPrimary').concat(inDescriptionStylesButton)}>
                <Button
                  variant="customOutline"
                  className='rounded-[5px] h-[60px] text-[18px] text-customPrimary'
                  size="full"
                  onClick={addToCart}
                  disabled={
                    variant?.availability === $Enums.AvailablityStatus.OUT_OF_STOCK || isInCart
                  }
                >{isInCart ? t("inCart") : t("toCart")}</Button>
              </div>
            </>
            }
        </div>
    )
}

export default MakeOrder
