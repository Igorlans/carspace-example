import prisma from "@/prisma/client";
import {ProductFormValues} from "@/types/product";
import {$Enums} from "@prisma/client";

export const getUpdateVariantsPromises = async (product: ProductFormValues, language: $Enums.Language) => {
    const oldProduct = await prisma.product.findUnique({
        where: {
            id: product.id
        },
        select: {
            variants: {
                select: {
                    id: true
                }
            }
        }
    })

    const variantsToDelete = oldProduct?.variants
        .filter((oldVariant) => {
            return !product?.variants?.some(
                (newVariant) =>
                    newVariant?.id === oldVariant?.id
            )
        })

    console.log('variantsToDelete ===========', variantsToDelete)

    let variantsToDeletePromises = variantsToDelete?.map(variant => {
        return prisma.variant.delete({
            where: {
                id: variant.id
            }
        })
    })

    if (!variantsToDeletePromises?.length) {
        variantsToDeletePromises = []
    }

    let updateVariantsPromises = product?.variants?.map((variant, index) => {

        const updateTranslations = {
            textFields_ru: language === 'ru' ? {
                upsert: {
                    update: {
                        title: variant.title,
                        subtitle: variant.subtitle,
                    },
                    create: {
                        title: variant.title,
                        subtitle: variant.subtitle,
                        language
                    }
                }

            } : undefined,
            textFields_uz: language === 'uz' ? {
                upsert: {
                    update: {
                        title: variant.title,
                        subtitle: variant.subtitle,
                    },
                    create: {
                        title: variant.title,
                        subtitle: variant.subtitle,
                        language
                    }
                }

            } : undefined,
        }

        const createTranslations = {
            textFields_ru: language === 'ru' ? {
                create: {
                    title: variant.title,
                    subtitle: variant.subtitle,
                    language
                }
            } : undefined,
            textFields_uz: language === 'uz' ? {
                create: {
                    title: variant.title,
                    subtitle: variant.subtitle,
                    language
                }
            } : undefined,
        }


        const isMainQuery = index === 0 ? {isMain: true} : {}

        return prisma.variant.upsert({
            where: {
                id: variant?.id || 'create'
            },
            update: {
                image: {
                    update: {
                        data: {
                            url: variant?.image?.url,
                            name: variant.image?.name,
                        }
                    }
                },
                crmId: variant.crmId,
                sku: variant.sku,
                price: Number(variant.price),
                oldPrice: variant.oldPrice ? Number(variant.oldPrice) : null,
                availability: variant.availability,
                ...updateTranslations,
                ...isMainQuery
            },
            create: {
                image: {
                    create:  {
                        url: variant?.image?.url,
                        name: variant?.image?.name
                    }
                },
                productId: product.id,
                crmId: variant.crmId,
                sku: variant.sku,
                price: Number(variant.price),
                oldPrice: variant.oldPrice ? Number(variant.oldPrice) : null,
                availability: variant.availability,
                ...createTranslations,
                ...isMainQuery
            }
        })
    })

    if (!updateVariantsPromises?.length) {
        updateVariantsPromises = []
    }

    return [...updateVariantsPromises, ...variantsToDeletePromises]
}