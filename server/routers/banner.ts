import { publicProcedure, router } from "@/server/trpc";
import {TRPCError} from "@trpc/server";
import { z } from "zod";
import { bannerImageSchema } from "@/types/banner";
import prisma from "@/prisma/client";
import transformBannerImage from "@/utils/transformBannerImage";
import {revalidatePath} from "next/cache";

export const bannerRouter = router({
    createBanner: publicProcedure.input(bannerImageSchema).mutation(async ({input}) => {
        if (!input) throw new TRPCError({message: 'There is no banner id', code: 'NOT_FOUND'})
        try {
            await prisma.banner.create({
                data: {
                    urlDesktop: input.urlDesktop,
                    urlMobile: input.urlMobile,
                    link: input.link,
                    name: input.name
                }
            })
            revalidatePath('/(client)/[locale]')
        } catch (e) {
            console.log(e);
        }
    }),

    getBanner: publicProcedure.query(async () => {
        try {
            const banners = await prisma.banner.findMany()
            return transformBannerImage(banners)
        } catch (e) {
            console.log(e);
        }
    }),

    deleteBanner: publicProcedure.input(z.object({
        id: z.string()
    })).mutation(async ({input}) => {
        if (!input) throw new TRPCError({message: 'There is no banner id', code: 'NOT_FOUND'})
        try {
            await prisma.banner.delete({
                where: {
                    id: input.id
                }
            })
            revalidatePath('/(client)/[locale]')
        } catch (e) {
            console.log(e);
        }
    })
})