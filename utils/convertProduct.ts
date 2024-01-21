import {$Enums, Prisma} from "@prisma/client";
import {convertCategory} from "@/utils/convertCategory";

export const relatedProductIncludeArgs = {
    include: {
        images: {
            select: {
                id: true,
                name: true,
                url: true
            }
        },
        variants: {
            include: {
                textFields_ru: true,
                textFields_uz: true
            }
        },
    }
}

export const fullProductIncludeArgs = {
    include: {
        images: {
            select: {
                id: true,
                name: true,
                url: true
            }
        },
        category: {
            include: {
                textFields_ru: true,
                textFields_uz: true
            }
        },
        variants: {
            include: {
                textFields_ru: true,
                textFields_uz: true,
                image: {
                    select: {
                        id: true,
                        url: true,
                        name: true
                    }
                },
            },
        },
        specs: {
            include: {
                textFields_ru: true,
                textFields_uz: true
            }
        },
        questions: {
            include: {
                textFields_ru: true,
                textFields_uz: true
            }
        },
        reviews: true,
        landing: {
            include: {
                review: true,
                textFields_ru: true,
                textFields_uz: true
            }
        },
        relatedProducts: relatedProductIncludeArgs,
    }
}

export type FullProduct = Prisma.ProductGetPayload<typeof fullProductIncludeArgs>
export type RelatedProduct = Prisma.ProductGetPayload<typeof fullProductIncludeArgs>


const translateVariants = (variants: FullProduct['variants'], language: $Enums.Language) => {
    return variants?.map(variant => {
        const translation = variant[`textFields_${language}`] || variant[`textFields_ru`]
        const formedVariant = {
            ...variant,
            oldPrice: variant?.oldPrice === null ? '': variant.oldPrice,
            title: translation?.title,
            subtitle: translation?.subtitle,
        }
        const { textFields_ru, textFields_uz, ...otherProps} = formedVariant
        return otherProps
    })
}

const translateQuestions = (questions: FullProduct['questions'], language: $Enums.Language) => {
    return questions?.map(question => {
        const translation = question[`textFields_${language}`] || question[`textFields_ru`]
        const formedQuestion = {
            ...question,
            question: translation?.question,
            answer: translation?.answer,
        }
        const { textFields_ru, textFields_uz, ...otherProps} = formedQuestion
        return otherProps
    })
}

const translateSpecs = (specs: FullProduct['specs'], language: $Enums.Language) => {
    return specs?.map(spec => {
        const translation = spec[`textFields_${language}`] || spec[`textFields_ru`]
        const formedSpec = {
            ...spec,
            title: translation?.title,
            value: translation?.value,
        }
        const { textFields_ru, textFields_uz, ...otherProps} = formedSpec
        return otherProps
    })
}

const translateLanding = (landing: FullProduct['landing'], language: $Enums.Language) => {
        if (!landing?.id) return null;
        const translation = landing[`textFields_${language}`] || landing[`textFields_ru`]
        const formedLanding = {
            ...landing,
            title: translation?.title,
            subtitle: translation?.subtitle,
            featureItem_1: translation?.featureItem_1,
            featureItem_2: translation?.featureItem_2,
            featureItem_3: translation?.featureItem_3,
            description_title_1: translation?.description_title_1,
            description_text_1: translation?.description_text_1,
            description_title_2: translation?.description_title_2,
            description_text_2: translation?.description_text_2,
            description_title_3: translation?.description_title_3,
            description_text_3: translation?.description_text_3,
            review: {
                ...landing.review,
                createdAt: String(landing.review?.createdAt) as string
            },
            block_4: translation?.block_4,
            title_4: translation?.title_4,
            subtitle_4: translation?.subtitle_4,
            featureItem_4_1: translation?.featureItem_4_1,
            featureItem_4_2: translation?.featureItem_4_2,
            featureItem_4_3: translation?.featureItem_4_3,
        }
        const { textFields_ru, textFields_uz, ...otherProps} = formedLanding
        return otherProps
}

export const convertProduct = (product: FullProduct, language: $Enums.Language) => {
    const translatedVariants = translateVariants(product.variants, language)
    const translatedQuestions = translateQuestions(product.questions, language)
    const translatedSpecs = translateSpecs(product.specs, language)
    const translatedLanding = translateLanding(product.landing, language)

    const translatedRelatedProducts = product.relatedProducts?.map(product => {
        const translatedVariants = translateVariants(product.variants as FullProduct['variants'], language)

        return {
            ...product,
            variants: translatedVariants,
        }
    })

    return {
        ...product,
        variants: translatedVariants,
        specs: translatedSpecs,
        questions: translatedQuestions,
        landing: translatedLanding,
        category: convertCategory(product.category, language),
        relatedProducts: translatedRelatedProducts
    }
}


export const convertProducts = (products: FullProduct[], language: $Enums.Language) => {
    return products?.map(product => convertProduct(product, language))
}
