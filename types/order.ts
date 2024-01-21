import { RouterOutput } from "@/app/_trpc/client";

import { z } from "zod"
import { imageInput } from "./types";
import { $Enums } from "@prisma/client";

import { useTranslations } from "next-intl";

export const orderSchemaFunc = () => {
    const t = useTranslations("validation")

    const orderShcema = z.object({
        id: z.string().optional(),
        name: z.string().nonempty(t("required")),
        phone:
            z.string()
            .nonempty(t("required"))
            .refine(number => !isNaN(parseFloat(number)), {
                message: "Invalid"
            }),
        promocode: z.string().optional(),
        items: z.array(orderItem),
        totalPrice: z.number()
    })

    return orderShcema
}
export const orderItem = z.object({
    id: z.string(),
    variantId: z.string(),
    crmId: z.string(),
    sku: z.string(),
    categoryId: z.string(),
    quantity:
        z.string()
        .refine(quantity => !isNaN(parseFloat(quantity)), {
            message: "Invalid"
        }).or(z.number()),
    title: z.string(),
    subtitle: z.string(),
    price:
        z.string()
        .refine(price => !isNaN(parseFloat(price)), {
            message: "Invalid"
        }).or(z.number()),
    // oldPrice:
    //     z.string()
    //     .refine(price => !isNaN(parseFloat(price)), {
    //         message: "Invalid"
    //     }).or(z.number()),
    oldPrice:
        z.string().or(z.number()),
    onFresh: z.boolean(),
    onBestsellers: z.boolean(),
    image: imageInput
})

export const orderShcema = z.object({
    id: z.string().optional(),
    name: z.string().nonempty("Обов'язкове поле"),
    phone:
        z.string()
        .nonempty("Обов'язкове поле")
        .refine(number => !isNaN(parseFloat(number)), {
            message: "Invalid"
        }),
    promocode: z.string().optional(),
    items: z.array(orderItem),
    totalPrice: z.number()
})

export type OrderValues = z.infer<typeof orderShcema>
export type OrderItemValues = z.infer<typeof orderItem>

export type FullOrder = RouterOutput["order"]["getOrders"]
export type SingleOrder = RouterOutput["order"]["getOrderById"]


export const promocodeSchema = z.object({
    id: z.string().optional(),
    type: z.union([
        z.literal($Enums.PromocodeType.FIXED),
        z.literal($Enums.PromocodeType.PERCENT)
    ]),
    code: z.string().nonempty("Обов'язкове поле"),
    value:
        z.string()
        .nonempty("Обов'язкове поле")
        .refine(value => !isNaN(parseFloat(value)), {
            message: "Скидка должна быть только числом"
        })
        .refine(value => parseFloat(value) > 0, {
            message: "Размер скидки должен быть больше нуля"
        })
        .transform(value => parseFloat(value)).or(z.number()),
    isActive: z.boolean()
}).refine(({type, value}) => {
    if (type === "PERCENT") return parseFloat(value as unknown as string) <= 100
    return true
}, {
    message: "Размер скидки не может быть больше 100%",
    path: ["value"]
})

export type PromocodeSchemaValue = z.infer<typeof promocodeSchema>
export type SinglePromocode = RouterOutput["order"]["getPromocodeById"]
export type FullPromocode = RouterOutput["order"]["getPromocodes"]
