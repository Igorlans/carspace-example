import { imageInput } from "@/types/types"
import { z } from "zod"

export const categorySchema = z.object({
    title: z.string().nonempty('Поле обязательное').min(3, 'Мінімальна кількість символів - 3'),
    title_uz: z.string().nonempty('Поле обязательное').min(3, 'Мінімальна кількість символів - 3'),
    banner: z.string()
})

export type ICategorySchema = z.infer<typeof categorySchema>