import prisma from "@/prisma/client";
import {ProductFormValues} from "@/types/product";
import {$Enums} from "@prisma/client";

export const getUpdateSpecsPromises = async (product: ProductFormValues, language: $Enums.Language) => {

    const oldProduct = await prisma.product.findUnique({
        where: {
            id: product.id
        },
        select: {
            specs: {
                select: {
                    id: true
                }
            }
        }
    })

    const specsToDelete = oldProduct?.specs
        .filter((oldSpec) => {
            return !product?.specs?.some(
                (newSpec) =>
                    newSpec?.id === oldSpec?.id
            )
        })


    let specsToDeletePromises = specsToDelete?.map(spec => {
        return prisma.specsItem.delete({
            where: {
                id: spec.id
            }
        })
    })

    if (!specsToDeletePromises?.length) {
        specsToDeletePromises = []
    }

    let updateSpecsPromises = product?.specs?.map(spec => {

        const updateTranslations = {
            textFields_ru: language === 'ru' ? {
                upsert: {
                    update: {
                        title: spec.title,
                        value: spec.value,
                    },
                    create: {
                        title: spec.title,
                        value: spec.value,
                        language
                    }
                }

            } : undefined,
            textFields_uz: language === 'uz' ? {
                upsert: {
                    update: {
                        title: spec.title,
                        value: spec.value,
                    },
                    create: {
                        title: spec.title,
                        value: spec.value,
                        language
                    }
                }

            } : undefined,
        }

        const createTranslations = {
            textFields_ru: language === 'ru' ? {
                create: {
                    title: spec.title,
                    value: spec.value,
                    language
                }
            } : undefined,
            textFields_uz: language === 'uz' ? {
                create: {
                    title: spec.title,
                    value: spec.value,
                    language
                }
            } : undefined,
        }

        return prisma.specsItem.upsert({
            where: {
                id: spec?.id || 'create'
            },
            update: {
                ...updateTranslations
            },
            create: {
                productId: product.id,
                ...createTranslations
            }
        })
    })

    if (!updateSpecsPromises?.length) {
        updateSpecsPromises = []
    }

    return [...updateSpecsPromises, ...specsToDeletePromises]
}