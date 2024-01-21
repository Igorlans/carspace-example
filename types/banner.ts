import { RouterOutput } from "@/app/_trpc/client";
import { z } from "zod";

export const bannerImageSchema = z.object({
    id: z.string().optional(),
    urlDesktop: z.string().min(1, 'Фото обовʼязкове'),
    urlMobile: z.string().min(1, 'Фото обовʼязкове'),
    link: 
        z.string()
        .optional()
        .transform(value => {
            if (value === "") return undefined
            return value
        }),
    name: z.string().optional()
})

export type FullBanner = RouterOutput["banner"]["getBanner"]

export type BannerImageValue = z.infer<typeof bannerImageSchema>