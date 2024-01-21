import prisma from "@/prisma/client";
import {convertProducts, fullProductIncludeArgs} from "@/utils/convertProduct";

export const getSuggestedProducts = async (categoryIds: string[], language: 'ru' | 'uz') => {
    const rawProducts = await prisma.product.findMany({
        where: {
            categoryId: {
                in: categoryIds,
            },
            variants: {
                some: {
                    isMain: true,
                    availability: {
                        not: 'OUT_OF_STOCK'
                    }
                }
            }
        },
        ...fullProductIncludeArgs
    });

    const products = convertProducts(rawProducts, language)

    products.sort((a, b) => {
        const discountPercentA = (Number(a?.variants[0].oldPrice) - a?.variants[0].price) * 100 / Number(Number(a?.variants[0].oldPrice).toFixed(2)) || 0
        const discountPercentB = (Number(b?.variants[0].oldPrice) - b?.variants[0].price) * 100 / Number(Number(b?.variants[0].oldPrice).toFixed(2)) || 0
        return discountPercentB - discountPercentA;
    });

    const rawSuggestedProducts = await prisma.product.findMany({
        where: {
            isSuggested: true,
            variants: {
                some: {
                    isMain: true,
                    availability: {
                        not: 'OUT_OF_STOCK'
                    }
                }
            }
        },
        ...fullProductIncludeArgs
    });


    const suggestedProducts = convertProducts(rawSuggestedProducts, language)

    suggestedProducts.sort((a, b) => {
        const discountPercentA = (Number(a?.variants[0].oldPrice) - a?.variants[0].price) * 100 / Number(Number(a?.variants[0].oldPrice).toFixed(2)) || 0
        const discountPercentB = (Number(b?.variants[0].oldPrice) - b?.variants[0].price) * 100 / Number(Number(b?.variants[0].oldPrice).toFixed(2)) || 0
        return discountPercentB - discountPercentA;
    });

    const suggested = [...products, ...suggestedProducts]

    const uniqueIds = new Set();

    const uniqueSuggested = suggested.filter(product => {
        if (!uniqueIds.has(product.id)) {
            uniqueIds.add(product.id);
            return true;
        }
        return false;
    });

    return uniqueSuggested.slice(0, 10)

}