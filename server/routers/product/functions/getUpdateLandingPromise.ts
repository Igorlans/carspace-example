import prisma from "@/prisma/client";
import {ProductFormValues} from "@/types/product";
import {$Enums} from "@prisma/client";

export const getUpdateLandingPromise = (product: ProductFormValues, language: $Enums.Language) => {
    let deletePromise: any[] = []
    let upsertPromise: any[] = []

    const prismaDeleteLanding = prisma.landing.deleteMany({
        where: {
            productId: product?.id
        }
    })

    if (!product?.landing) {
        deletePromise.push(prismaDeleteLanding)
        return [...upsertPromise, ...deletePromise]
    }

    const {id, reviewId, image1, image2, image3, isVideo, image4, isVideo4, ...landingFields} = product.landing

    const updateTranslations = {
        textFields_ru: language === 'ru' ? {
            upsert: {
                update: {
                    ...landingFields
                },
                create: {
                    ...landingFields,
                    language
                }
            }

        } : undefined,
        textFields_uz: language === 'uz' ? {
            upsert: {
                update: {
                    ...landingFields,
                },
                create: {
                    ...landingFields,
                    language
                }
            }

        } : undefined,
    }

    const createTranslations = {
        textFields_ru: language === 'ru' ? {
            create: {
                ...landingFields,
                language
            }
        } : undefined,
        textFields_uz: language === 'uz' ? {
            create: {
                ...landingFields,
                language
            }
        } : undefined,
    }

    const landingPromise = prisma.landing.upsert({
        where: {
            id: product.landing?.id || 'create'
        },
        update: {
            image1: image1,
            isVideo: isVideo,
            image2: image2,
            image3: image3,
            isVideo4: product.landing?.isVideo4,
            image4: product.landing?.image4,
            reviewId: reviewId || null,
            ...updateTranslations
        },
        create: {
            image1: image1,
            isVideo: isVideo,
            image2: image2,
            image3: image3,
            isVideo4: product.landing?.isVideo4,
            image4: product.landing?.image4,
            productId: product.id,
            reviewId: reviewId || null,
            ...createTranslations
        }
    })

    upsertPromise.push(landingPromise)
    return [...upsertPromise, ...deletePromise]

}
