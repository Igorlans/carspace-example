import {protectedProcedure, publicProcedure, router} from "@/server/trpc";
import {TRPCError} from "@trpc/server";
import {string, z} from "zod";
import { imageInput } from "@/types/types";
import prisma from "@/prisma/client";
import { fullProductIncludeArgs } from "@/utils/convertProduct";
import { $Enums } from "@prisma/client";
import {revalidatePath} from "next/cache";

export const reviewRouter = router({
    getReviews: publicProcedure.query(async () => {
        const reviews = await prisma.review.findMany({
            include: {
                Product: fullProductIncludeArgs
            }
        })
        return reviews
    }),
    getSingleReview: publicProcedure.input(z.object({
        id: z.string()
    })).query(async ({ input }) => {
        if (!input) throw new TRPCError({message: 'There is no review id', code: 'NOT_FOUND'})
        try {
            const reviews = await prisma.review.findUnique({
                where: {
                    id: input.id
                },
                include: {
                    Product: fullProductIncludeArgs
                }
            })
            return reviews
        } catch (e) {
            console.log(e);
        }
    }),

    deleteReview: publicProcedure.input(z.object({
        id: z.string()
    })).mutation(async ({ input }) => {
        if (!input) throw new TRPCError({message: 'There is no review id', code: 'NOT_FOUND'})
        try {
            const deletedReview= await prisma.review.delete({
                where: {
                    id: input.id
                }
            })

            revalidatePath(`/(client)/[locale]/products/${deletedReview.productId}`)
        } catch (e) {
            console.log(e);
        }
    }),

    setModerationStatus: publicProcedure.input(z.object({
        id: z.string(),
        status: z.union([
            z.literal($Enums.ModerationStatus.ALLOWED),
            z.literal($Enums.ModerationStatus.ON_MODERATION),
            z.literal($Enums.ModerationStatus.REJECTED),
        ])
    })).mutation(async ({ input }) => {
        if (!input) throw new TRPCError({message: 'There is no review id', code: 'NOT_FOUND'})
        try {
            const updatedReview = await prisma.review.update({
                where: {
                    id: input.id
                }, 
                data: {
                    status: input.status
                }
            })

            revalidatePath(`/(client)/[locale]/products/${updatedReview.productId}`)
        } catch (e) {
            console.log(e);
        }
    }),

    getModeratedReviews: publicProcedure.query(async () => {
        try {
            const reviews = await prisma.review.findMany({
                where: {
                    status: $Enums.ModerationStatus.ALLOWED
                }
            })
            return reviews
         } catch (e) {
            console.log(e);
            throw e
        }
    })
})