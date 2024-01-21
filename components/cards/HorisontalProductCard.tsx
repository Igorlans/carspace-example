"use client"

import { FC } from "react";
import { useContext } from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import { CartContext } from "@/providers/cart-provider";
import { toast } from "react-hot-toast";
import { useRouter } from "next-intl/client";
import type { FullProduct } from "@/types/product";
import { useTranslations } from "next-intl";

interface ProductCardProps {
  orderItem: FullProduct
}

const HorisontalProductCard: FC<ProductCardProps> = ({ orderItem }) => {
  const cart = useContext(CartContext)
  const router = useRouter();
  const t = useTranslations("buttons")

  const selectedVariant = orderItem.variants[0]
  const isInCart = !!cart?.orders.find(item => item.variantId === selectedVariant.id)

  function addToCart () {
    if (isInCart) return toast.error("Товар уже в корзине")
    if (!orderItem) return
    try {
        cart?.saveOrders({
          id: orderItem.id,
          variantId: selectedVariant?.id,
          title: selectedVariant?.title!,
          subtitle: selectedVariant?.subtitle!,
          onFresh: orderItem?.onFresh,
          onBestsellers: orderItem?.onBestsellers,
          categoryId: orderItem.categoryId,
          crmId: selectedVariant?.crmId,
          sku: selectedVariant?.sku,
          //@ts-ignore
          image: orderItem.images[0],
          price: selectedVariant?.price!,
          oldPrice: selectedVariant?.oldPrice,
          quantity: 1
        })
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="select-none rounded-[8px] overflow-hidden hover:shadow-md p-2 duration-300"
      onClick={() => router.push(`/products/${orderItem.id}`)}
    >
      <div className="grid grid-cols-[1fr_2fr] md:grid-cols-[1fr_7fr] gap-x-[20px] md:gap-x-[30px] lg:gap-x-[30px] text-customPrimary pb-[22px] md:pb-0 lg:pb-0">
        <div className="aspect-square relative rounded-[10px] overflow-hidden h-[100px] w-[100px]">
          <Image
            src={orderItem.images[0]?.url}
            fill={true}
            style={{ objectFit: "cover" }}
            className="transition-transform duration-300 w-[100px] h-[100px]"
            alt="product"
          />
        </div>
        <div className="flex flex-col justify-start md:justify-center lg:justify-center md:gap-y-[10px] lg:gap-y-[10px]">
          <h1 className="font-dela text-[14px] md:text-[16px] lg:text-[16px] uppercase">{ orderItem.variants[0]?.title}</h1>
          <div className="flex flex-col md:grid grid-cols-3 items-start gap-y-2 gap-x-[10px] md:items-center justify-between">
            <div className="w-full flex flex-col md:flex-row lg:flex-row justify-start col-span-2">
              <div className="text-lightGray line-through text-[14px] md:text-[18px] lg:text-[18px] font-dela pr-0 md:pr-[10px] lg:pr-[10px]">
                {orderItem.variants[0]?.oldPrice.toLocaleString("ru")} сум
              </div>
              <div className="text-[16px] md:text-[20px] lg:text-[20px] font-dela">{orderItem.variants[0]?.price.toLocaleString("ru")} сум</div>
            </div>
            <Button
              variant="primary"
              size="full"
              disabled={isInCart}
              className={String("h-[37px] md:h-[41px] lg:h-[41px] w-full md:min-w-[150px] lg:min-w-[150px] hidden md:block lg:block").concat(isInCart ? "text-[14px]" : "text-[18px]")}
              onClick={(e) => {
                e.stopPropagation()
                addToCart()
              }}
            >
              {isInCart ? t("inCart") : t("addTo")}
            </Button>
          </div>
        </div>
      </div>
      <Button
        variant="primary"
        size="full"
        disabled={isInCart}
        className="h-[37px] w-full text-[14px] md:hidden lg:hidden"
        onClick={(e) => {
          e.stopPropagation()
          addToCart()
        }}
      >
        {isInCart ? t("inCart") : t("addTo")}
      </Button>
    </div>
  );
};

export default HorisontalProductCard;
