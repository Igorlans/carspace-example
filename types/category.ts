import {RouterOutput} from "@/app/_trpc/client";
import {z} from "zod";

export type FullCategory = RouterOutput['category']['getCategories'][number]

export const categorySearchParamsSchema = z.object({
    min: z.string().optional(),
    max: z.string().optional(),
    order: z.union([z.literal('price_asc'), z.literal('price_desc'), z.literal('discount_desc'), z.literal('date_desc')]).optional(),
}).and(z.record(z.string(), z.string())).optional()

export type CategorySearchParams = z.infer<typeof categorySearchParamsSchema>