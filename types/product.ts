import {RouterOutput} from "@/app/_trpc/client";
import {z} from "zod";
import {imageInput} from "@/types/types";
import {questionInput} from "@/types/question";

export const stockInput = z.union([z.literal('IN_STOCK'), z.literal('OUT_OF_STOCK'), z.literal('RUNS_OUT')])
export const moderationStatus = z.union([z.literal('ON_MODERATION'), z.literal('ALLOWED'), z.literal('REJECTED')])
export const variantInput = z.object({
    id: z.string().optional(),
    crmId: z.string().min(1, 'Поле обязательное'),
    sku: z.string().min(1, 'Поле обязательное'),
    title: z.string().min(1, 'Поле обязательное'),
    subtitle: z.string(),
    price: z.string().regex(/^-?\d+(\.\d+)?$/, 'Введите корректное число').transform(Number).or(z.number()),
    oldPrice: z.string().regex(/^-?\d*(\.\d+)?$/, 'Введите корректное число').transform(Number).or(z.number()).optional().nullable(),
    // oldPrice: z.string().regex(/^\d+$/, 'Введіть число').transform(Number).optional(),
    availability: stockInput,
    image: imageInput
})

export const reviewSchema = z.object({
    id: z.string().optional(),
    rating:
        z.number()
        .refine(rating => rating !== 0, {
            message: "Залиште оцінку"
        }),
    name: z.string().nonempty("Поле обязательное"),
    phone: z.string().nonempty("Поле обязательное"),
    comment: z.string().nonempty("Поле обязательное"),
    status: moderationStatus,
    file: z.string().optional(),
    file2: z.string().optional(),
    file3: z.string().optional(),
    isPublic: z.boolean(),
    productId: z.string()
})

export type RewiewFormValues = z.infer<typeof reviewSchema>

export type FullReview = RouterOutput["product"]["getReviewByProduct"]

export const relatedProductInput = z.object({
    id: z.string(),
    name: z.string(),
})

export const specInput = z.object({
    id: z.string().optional(),
    title: z.string().min(1, 'Поле обязательное'),
    value: z.string().min(1, 'Поле обязательное'),
})

export const landingSchema = z.object({
    id: z.string().optional(),
    reviewId: z.string().optional(),
    image1: z.string().min(1, 'Поле обязательное'),
    isVideo: z.boolean(),
    image2: z.string().min(1, 'Поле обязательное'),
    image3: z.string(),
    image4: z.string().optional().nullable(),
    isVideo4: z.boolean().optional().nullable(),
    title: z.string().min(1, 'Поле обязательное'),
    subtitle: z.string(),
    featureItem_1: z.string().min(1, 'Поле обязательное'),
    featureItem_2: z.string().min(1, 'Поле обязательное'),
    featureItem_3: z.string().min(1, 'Поле обязательное'),
    description_title_1: z.string().optional().default(""),
    description_text_1: z.string().min(1, 'Поле обязательное'),
    description_title_2: z.string().optional().default(""),
    description_text_2: z.string().min(1, 'Поле обязательное'),
    description_title_3: z.string().optional().default(""),
    description_text_3: z.string().min(1, 'Поле обязательное'),
    block_4: z.boolean().optional().nullable(),
    title_4: z.string().optional(),
    subtitle_4: z.string().optional(),
    featureItem_4_1: z.string().optional(),
    featureItem_4_2: z.string().optional(),
    featureItem_4_3: z.string().optional()
})

export const productSchema = z.object({
    id: z.string().optional(),
    images: z.array(imageInput).optional(),
    onFresh: z.boolean(),
    onBestsellers: z.boolean(),
    categoryId: z.string().min(1, 'Поле обязательное'),
    isSuggested: z.boolean(),
    variants: z.array(variantInput).min(1, 'Minimal number of variants is 1'),
    specs: z.array(specInput).optional(),
    questions: z.array(questionInput).optional(),
    relatedProducts: z.array(relatedProductInput),
    landing: landingSchema.or(z.undefined()),
    video: z.string().optional()
})


export type ProductFormValues = z.infer<typeof productSchema>

export type FullVariant = RouterOutput['product']['getOneProduct']['variants'][number]

export type FullProduct = RouterOutput['product']['getOneProduct'];
export type FilterOrder = 'price_asc' | 'price_desc' | 'discount_desc' | 'date_desc'


// export const testProduct: ProductFormValues = {
//     id: 'cllwh3w360001e9di85la9wa3',
//     images: [
//         {
//             name: 'Fotka dildaka3',
//             url: 'http://localhost:3001'
//         },
//         {
//             name: 'Фотка ділдака2',
//             url: 'http://localhost:3002'
//         },
//         // {
//         //     name: 'Фотка ділдака3',
//         //     url: 'http://localhost:3003'
//         // },
//     ],
//     variants: [
//         {
//             id: 'cllxico7p004me9qsu09b02uj',
//             title: 'UZdakcih',
//             price: 150,
//             sku: '1234r3',
//             crmId: '124213244',
//             image: {
//                 name: 'Fotka dildakaaaa',
//                 url: 'http://localhost:3000'
//             },
//             subtitle: 'uzdakich',
//             availability: 'IN_STOCK',
//         },
//     ],
//     categoryId: 'cllumafeq0013e99mueaq2erf',
// }
