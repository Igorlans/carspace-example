import {z} from "zod";

export const languageInput = z.union([z.literal('ru'), z.literal('uz')])
export const imageInput = z.object({
    id: z.string().optional(),
    url: z.string().min(1, 'Фото обовʼязкове'),
    link: z.string().optional().or(z.null()),
    name: z.string().optional()
})

export type ImageInputValue = z.infer<typeof imageInput>

export type languageInputValues = z.infer<typeof languageInput>
