import {protectedProcedure, publicProcedure, router} from "@/server/trpc";
import prisma from "@/prisma/client";
import {z} from "zod";
import {categorySchema} from "@/app/(admin)/adminpanel/category/formSchema";
import {convertCategories, convertCategory, fullCategoryIncludeArgs} from "@/utils/convertCategory";
import {TRPCError} from "@trpc/server";
import {languageInput} from "@/types/types";
import {slugify} from "@/utils/slugify";
import type { ImageInputValue } from "@/types/types";
import {revalidatePath} from "next/cache";
const translit = require('translitit-cyrillic-russian-to-latin');
const categoryInput = categorySchema.merge(z.object({id: z.string().optional()}))
export const categoryRouter = router({
    getCategories: publicProcedure.input(languageInput).query(async ({input}) => {
        const categories = await prisma.category.findMany(fullCategoryIncludeArgs)
        return convertCategories(categories, input);
    }),

    // getFooterCategories: publicProcedure.input(z.object({
    //     idArray: z.array(z.string()),
    //     languageInput
    // })).query(async ({input}) => {
    //     if (!input.idArray) throw new TRPCError({message: 'There is no category id', code: 'NOT_FOUND'})
    //     try {
    //         const categories = await prisma.category.findMany({
    //             where: {
    //                 id: {in: input.idArray}
    //             },
    //             ...fullCategoryIncludeArgs
    //         })
    //         return convertCategories(categories, input.languageInput);
    //     } catch (e) {
    //         console.log(e);
    //         throw e
    //     }
    // }),

    getCategory: publicProcedure.input(z.object({
        id: z.string(),
        language: languageInput
    })).query(async ({input: {id, language}}) => {
        const category = await prisma.category.findUnique({
            where: {
                id
            },
            include: fullCategoryIncludeArgs.include
        })

        if (!category) {
            throw new TRPCError({message: 'There is no such category', code: 'NOT_FOUND'})
        }
        return convertCategory(category, language);
    }),


    createCategory: protectedProcedure.input(categoryInput).mutation(async ({input}) => {
        try {
            const slug = slugify(input.title)

            if (input.id) {
                const updatedCategory = await prisma.category.update({
                    where: {
                        id: input.id,
                    },
                    data: {
                        textFields_ru: {
                            update: {
                                language: 'ru',
                                title: input.title
                            }
                        },
                        textFields_uz: {
                            update: {
                                language: 'uz',
                                title: input.title_uz
                            }
                        },
                        Banner: input.banner,
                        slug
                    },
                })

                revalidatePath('/(client)/[locale]/products/[slug]')
                revalidatePath('/(client)/[locale]')

                return updatedCategory
            } else {
                const createdCategory = await prisma.category.create({
                    data: {
                        textFields_ru: {
                            create: {
                                language: 'ru',
                                title: input.title
                            }
                        },
                        textFields_uz: {
                            create: {
                                language: 'uz',
                                title: input.title_uz
                            }
                        },
                        Banner: input.banner,
                        slug
                    },
                })

                return createdCategory;
            }
        } catch (e) {
            console.log(e)
        }

    })
})