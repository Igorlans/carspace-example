"use client"

import { useMemo, useEffect, useState } from 'react';

import {useRouter, usePathname} from 'next-intl/client';
import {gtmService} from "@/services/gtm/gtmService";

import { FullProduct, FullVariant } from '@/types/product';

function transformTitle(title: string, sku: string = '') {
    var words = title.trim().toLocaleLowerCase().split(" ")
    // var wordsSku = sku ? sku.trim().toLocaleLowerCase().split(" ") : []
    // const words = wordsTitle.concat(wordsSku)
    return words.reduce((acc, item) => acc + "_" + item, "").slice(1)
}

export default function useActiveVariant (product: FullProduct) {
    const router = useRouter()
    const pathname = usePathname()

    const [activeVariant, setActiveVariant] = useState<string | null>(null) // variantId

    useEffect(() => {
        if (!activeVariant && product.variants.length == 1){
          setActiveVariant(product.variants[0].id); // set initial variant
        }
    }, []);

    useEffect(() => {
        if(activeVariant){
          const activeVariantTitle = product?.variants.find((variant: FullVariant) => variant.id === activeVariant);
          if (activeVariantTitle?.title){
            router.push(`?variant=${transformTitle(activeVariantTitle?.title, activeVariantTitle?.sku)}`, { scroll: false }); // set variant title to search params
          }
          gtmService.viewItem(product, variant);
        }
    }, [activeVariant]);

    const variant: FullVariant | null = useMemo(() => {
        const variant = product.variants?.find((variant: FullVariant) => variant.id === activeVariant)

        if (variant){
          return variant;
        } else {
          // return product?.variants[0];
          return null;
        }

    }, [activeVariant]);

    const defaultVariant: FullVariant = product?.variants[0];

    function handleVariantChange(id: string) {
        if (id) setActiveVariant(id)
        else  setActiveVariant(product.variants[0].id) // set initial variant
    }

    return {
        handleVariantChange,
        variant,
        defaultVariant
    }

}
