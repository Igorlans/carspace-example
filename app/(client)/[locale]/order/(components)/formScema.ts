import { z } from "zod"

export const formSchema = z.object({
    promocode: z.string().optional(),
    name: z.string().nonempty("Поле обязательное"),
    phone: z.string().nonempty("Поле обязательное")
})

export type IFormSchema = z.infer<typeof formSchema>