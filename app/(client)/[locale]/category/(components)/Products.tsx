import {FC} from 'react'

import ProductGrid from '@/components/layouts/ProductGrid'
import ProductCard from '@/components/cards/ProductCard'
import {FullProduct, FullVariant} from "@/types/product";

interface ProductsProps {
    products: FullProduct[]
}

const Products: FC<ProductsProps> = ({products}) => {
    return (
        <ProductGrid>
            {
                products?.map(product => {
                    const mainVariant = product.variants[0]
                    if (!mainVariant) return;

                    return (
                        <ProductCard
                            product={product}
                        />
                    )
                })
            }
        </ProductGrid>
    )
}

export default Products