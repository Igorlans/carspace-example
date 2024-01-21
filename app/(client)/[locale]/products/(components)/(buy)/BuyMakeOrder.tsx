"use client"

import {FC, useMemo} from 'react'
import {useState, useEffect} from 'react';

import ClientProvider from '@/providers/client-provider'
import {FullProduct, FullVariant} from '@/types/product';
import useActiveVariant from '@/hooks/useActiveVariant';
import MakeOrder from './MakeOrder';

interface BuyMakeOrderProps {
    product: FullProduct,
    makeOrderOnly?: boolean,
    inDescription?: boolean
}

const BuyMakeOrder: FC<BuyMakeOrderProps> = ({product, makeOrderOnly = true, inDescription = false}) => {
    const { handleVariantChange, variant } = useActiveVariant(product)

    return (
        <MakeOrder product={product} variant={variant} makeOrderOnly={makeOrderOnly} inDescription={inDescription} />
    )
}

export default BuyMakeOrder
