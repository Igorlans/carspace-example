import {protectedProcedure, publicProcedure, router} from "@/server/trpc";
import prisma from "@/prisma/client";
import {convertProduct, convertProducts, fullProductIncludeArgs} from "@/utils/convertProduct";
import {z} from "zod";
import {TRPCError} from "@trpc/server";
import {productSchema, reviewSchema} from "@/types/product";
import {languageInput} from "@/types/types";
import {
    getUpdateQuestionsPromises,
} from "@/server/routers/product/functions/getUpdateQuestionsPromise";
import {getUpdateVariantsPromises} from "@/server/routers/product/functions/getUpdateVariantsPromises";
import {getUpdateSpecsPromises} from "@/server/routers/product/functions/getUpdateSpecsPromises";
import {getUpdateLandingPromise} from "@/server/routers/product/functions/getUpdateLandingPromise";
import {convertCategory} from "@/utils/convertCategory";
import {categorySearchParamsSchema} from "@/types/category";
import {getSuggestedProducts} from "@/utils/getSuggestedProducts";
import {revalidatePath} from "next/cache";

export const productRouter = router({
    getAllProducts: publicProcedure.input(z.object({
        language: languageInput,
        params: categorySearchParamsSchema.optional()
    }))
        .query(async ({input}) => {
            try {
                const minMaxParams = input.params?.max && input.params?.min ? {
                    variants: {
                        some: {
                            isMain: true,
                            price: {
                                lte: Number(input.params?.max),
                                gte: Number(input.params?.min),
                            }
                        }
                    }
                } : {}

                const products = await prisma.product.findMany({
                    where: {
                        ...minMaxParams
                    },
                    ...fullProductIncludeArgs
                })

                const variants = await prisma.variant.aggregate({
                    where: {
                        isMain: true
                    },
                    _min: {
                        price: true
                    },
                    _max: {
                        price: true
                    },
                })

                let convertedProducts = convertProducts(products, input.language)

                if (input.params?.order) {
                    if (input.params.order === 'price_asc') {
                        convertedProducts = convertedProducts.sort((a, b) => a.variants[0].price - b.variants[0].price)
                    } else if (input.params.order === 'price_desc') {
                        convertedProducts = convertedProducts.sort((a, b) => b.variants[0].price - a.variants[0].price)
                    } else if (input.params.order === 'discount_desc') {
                        convertedProducts.sort((a, b) => {
                            const discountPercentA = (Number(a?.variants[0].oldPrice) - a?.variants[0].price) * 100 / Number(Number(a?.variants[0].oldPrice).toFixed(2)) || 0
                            const discountPercentB = (Number(b?.variants[0].oldPrice) - b?.variants[0].price) * 100 / Number(Number(b?.variants[0].oldPrice).toFixed(2)) || 0
                            return discountPercentB - discountPercentA;
                        });
                    } else {
                        convertedProducts = convertedProducts.sort((a, b) => Number(a.createdAt) - Number(b.createdAt))
                    }
                }

                return {
                    products: convertedProducts,
                    min: variants._min.price,
                    max: variants._max.price,
                    order: input.params?.order || 'date_desc'
                };

            } catch (e) {
                console.log(e)
                throw e;
            }
        }),
    getOneProduct: publicProcedure.input(z.object({
        id: z.string(),
        language: languageInput
    }))
        .query(async ({input}) => {
            try {
                const product = await prisma.product.findUnique({
                    where: {
                        id: input.id
                    },
                    include: fullProductIncludeArgs.include
                })

                if (!product) throw new TRPCError({message: 'Product is not found', code: 'NOT_FOUND'})

                return convertProduct(product, input.language)
            } catch (e) {
                throw e;
            }
        }),
    createProduct: protectedProcedure.input(z.object({
        product: productSchema,
        language: languageInput
    })).mutation(async ({input: {language, product}}) => {
        try {
            console.log('BODY =============', JSON.stringify(product, undefined, 4))
            const createVariantsQuery = product?.variants?.map((variant, index) => {
                const translations = {
                    textFields_ru: language === 'ru' ? {
                        create: {
                            title: variant.title,
                            subtitle: variant?.subtitle,
                            language,
                        },

                    } : undefined,
                    textFields_uz: language === 'uz' ? {
                        create: {
                            title: variant.title,
                            subtitle: variant?.subtitle,
                            language,
                        },

                    } : undefined,
                }


                const {title, subtitle, ...variantWithoutTextFields} = variant

                const isMainQuery = index === 0 ? {isMain: true} : {}

                return {
                    ...variantWithoutTextFields,
                    ...isMainQuery,
                    price: Number(variant.price),
                    oldPrice: variant.oldPrice ? Number(variant.oldPrice) : null,
                    image: {
                        create: {
                            url: variant.image.url,
                            name: variant.image?.name,
                        }
                    },
                    ...translations
                }
            })

            const createSpecsQuery = product?.specs?.map(spec => {
                const translations = {
                    textFields_ru: language === 'ru' ? {
                        create: {
                            title: spec.title,
                            value: spec.value,
                            language,
                        },

                    } : undefined,
                    textFields_uz: language === 'uz' ? {
                        create: {
                            title: spec.title,
                            value: spec.value,
                            language,
                        },

                    } : undefined,
                }

                return translations
            })

            const createQuestionsQuery = product?.questions?.map(question => {
                const translations = {
                    textFields_ru: language === 'ru' ? {
                        create: {
                            question: question.question,
                            answer: question.answer,
                            language,
                        },

                    } : undefined,
                    textFields_uz: language === 'uz' ? {
                        create: {
                            question: question.question,
                            answer: question.answer,
                            language,
                        },

                    } : undefined,
                }

                return translations
            })


            // const createdProduct = await prisma.product.create({
            //     data: {
            //         categoryId: product.categoryId,
            //         images: {
            //             create: product?.images?.map((image, index) => ({url: image.url, name: String(index)}))
            //         },
            //         variants: {
            //             create: createVariantsQuery
            //         },
            //         specs: {
            //             create: createSpecsQuery
            //         },
            //         questions: {
            //             create: createQuestionsQuery
            //         },
            //         relatedProducts: {
            //             connect: product.relatedProducts
            //         },
            //         onFresh: product.onFresh,
            //         onBestsellers: product.onBestsellers,
            //         isSuggested: product.isSuggested,
            //         video: product?.video
            //     },
            // })

            const createdProduct = await prisma.product.create({
                data: {
                    categoryId: product.categoryId,
                    // images: {
                    //     create: product?.images?.map((image, index) => ({url: image.url, name: String(index)}))
                    // },
                    variants: {
                        create: createVariantsQuery
                    },
                    // specs: {
                    //     create: createSpecsQuery
                    // },
                    // questions: {
                    //     create: createQuestionsQuery
                    // },
                    // relatedProducts: {
                    //     connect: product.relatedProducts
                    // },
                    onFresh: product.onFresh,
                    onBestsellers: product.onBestsellers,
                    isSuggested: product.isSuggested,
                    video: product?.video
                },
            })

            if(createdProduct?.id){
              product.id = createdProduct.id

              const updateProductPromise = await prisma.product.update({
                  where: {
                      id: product.id
                  },
                  data: {
                    images: {
                        create: product?.images?.map((image, index) => ({url: image.url, name: String(index)}))
                    },
                    // variants: {
                    //     create: createVariantsQuery
                    // },
                    specs: {
                        create: createSpecsQuery
                    },
                    questions: {
                        create: createQuestionsQuery
                    },
                    relatedProducts: {
                        set: product.relatedProducts.map((relProduct => ({id: relProduct.id})))
                    },
                  },
              })

            }

            // console.log("Created product:", createdProduct);

            return createdProduct;

        } catch (e) {
            console.log(e)
            throw e;
        }
    }),

    updateProduct: protectedProcedure.input(
        z.object({
            product: productSchema,
            language: languageInput
        })
    ).mutation(async ({input: {language, product}}) => {
        try {

            if (!product?.id) throw new TRPCError({message: 'There is no product id', code: 'NOT_FOUND'})


            const updateVariantsPromises = await getUpdateVariantsPromises(product, language)
            const updateQuestionsPromises = await getUpdateQuestionsPromises(product, language)
            const updateSpecsPromises = await getUpdateSpecsPromises(product, language)
            const updateLandingPromises = getUpdateLandingPromise(product, language)


            const updateProductPromise = prisma.product.update({
                where: {
                    id: product.id
                },
                data: {
                    categoryId: product.categoryId,
                    images: {
                        deleteMany: {},
                        create: product.images?.map((image, index) => ({url: image.url, name: String(index)}))
                    },
                    relatedProducts: {
                        set: product.relatedProducts.map((product => ({id: product.id})))
                    },
                    onFresh: product.onFresh,
                    onBestsellers: product.onBestsellers,
                    isSuggested: product.isSuggested,
                    video: product?.video
                },
            })


            await prisma.$transaction([
                updateProductPromise,
                ...updateVariantsPromises,
                ...updateQuestionsPromises,
                ...updateSpecsPromises,
                ...updateLandingPromises
            ])


            revalidatePath('/(client)/[locale]')
            revalidatePath(`/(client)/[locale]/products/${product.id}`)

        } catch (e) {
            console.log(e)
            throw e;
        }
    }),

    deleteProduct: protectedProcedure.input(z.string()).mutation(async ({input}) => {
        try {

            const variantsToDelete = await prisma.product.findUnique({
                where: {
                    id: input
                },
                select: {
                    variants: {
                        select: {
                            id: true
                        }
                    }
                }
            })

            console.log('variantsToDelete ===========', variantsToDelete)

            if(variantsToDelete?.variants){
              for (let index = 0; index < variantsToDelete?.variants.length; index++) {
                var variant = variantsToDelete.variants[index];
                var variantsDeletionResult = await prisma.variant.delete({
                  where: {
                    id: variant.id
                  }
                });

              }
            }

            // let variantsToDeletePromises = variantsToDelete?.variants.map(variant => {
            //     return prisma.variant.delete({
            //         where: {
            //             id: variant.id
            //         }
            //     })
            // })

            const questionsToDelete = await prisma.product.findUnique({
                where: {
                    id: input
                },
                select: {
                    questions: {
                        select: {
                            id: true
                        }
                    }
                }
            })

            console.log('questionsToDelete ===========', questionsToDelete)

            if(questionsToDelete?.questions){
              for (let index = 0; index < questionsToDelete?.questions.length; index++) {
                var question = questionsToDelete.questions[index];
                var questionDeletionResult = await prisma.questionItem.delete({
                  where: {
                    id: question.id
                  }
                });

              }
            }

            const deletedProduct = await prisma.product.delete({
                where: {
                    id: input
                }
            })

            revalidatePath('/(client)/[locale]')

            return deletedProduct;
        } catch (e) {
            console.log(e)
        }
    }),

    createReview: publicProcedure.input(reviewSchema).mutation(async ({
                                                                          input: {
                                                                              name,
                                                                              phone,
                                                                              status,
                                                                              file,
                                                                              file2,
                                                                              file3,
                                                                              comment,
                                                                              productId,
                                                                              isPublic,
                                                                              rating
                                                                          }
                                                                      }) => {
        const review = await prisma.review.create({
            data: {
                productId,
                name,
                phone,
                rating,
                status,
                file,
                file2,
                file3,
                comment,
                isPublic,
                createdAt: String(Date.now())
            }
        })

        revalidatePath(`/(client)/[locale]/products/${productId}`)
        return review
    }),
    getReviewByProduct: publicProcedure.input(
        z.object({
            productId: z.string()
        })
    ).query(async ({input: {productId}}) => {
        try {
            if (!productId) throw new TRPCError({message: "There is no product id", code: "NOT_FOUND"})

            const reviews = prisma.review.findMany({
                where: {
                    productId
                }
            })
            return reviews
        } catch (e) {
            console.log(e);
        }
    }),

    searchProduct: publicProcedure
        .input(z.object({
            language: languageInput,
            query: z.string(),
            limit: z.number().optional()
        }))
        .query(async ({input: {language, query, limit}}) => {
            try {
                const searchedProducts = await prisma.product.findMany({
                    take: limit,
                    where: {
                        variants: {
                            some: {
                                OR: [
                                    {
                                        textFields_ru: {
                                            OR: [
                                                {
                                                    title: {
                                                        contains: query,

                                                    }
                                                },
                                                {
                                                    subtitle: {
                                                        contains: query
                                                    }
                                                },
                                            ]
                                        }
                                    },
                                    {
                                        textFields_uz: {
                                            OR: [
                                                {
                                                    title: {
                                                        contains: query
                                                    }
                                                },
                                                {
                                                    subtitle: {
                                                        contains: query
                                                    }
                                                },
                                            ]
                                        }
                                    }
                                ]
                            }
                        }
                    },
                    ...fullProductIncludeArgs
                })

                const convertedProducts = convertProducts(searchedProducts, language)

                const sortedProducts = convertedProducts.sort((a, b) => {
                    const discountPercentA = (Number(a?.variants[0].oldPrice) - a?.variants[0].price) * 100 / Number(Number(a?.variants[0].oldPrice)) || 0
                    const discountPercentB = (Number(b?.variants[0].oldPrice) - b?.variants[0].price) * 100 / Number(Number(b?.variants[0].oldPrice)) || 0
                    return discountPercentB - discountPercentA;
                });

                return sortedProducts;
            } catch (e) {
                console.log(e)
            }
        }),

    getProductByType: publicProcedure.input(
        z.object({
            type: z.union([
                z.literal("onBestsellers"),
                z.literal("onFresh")
            ]),
            language: languageInput
        })
    ).query(async ({input: {type, language}}) => {
        try {
            let products;
            switch (type) {
                case "onBestsellers":
                    products = await prisma.product.findMany({
                        where: {
                            onBestsellers: true
                        },
                        ...fullProductIncludeArgs
                    })
                    return convertProducts(products, language)
                case "onFresh":
                    products = await prisma.product.findMany({
                        where: {
                            onFresh: true
                        },
                        ...fullProductIncludeArgs
                    })
                    return convertProducts(products, language)

                default:
                    products = await prisma.product.findMany({
                        where: {
                            onBestsellers: true
                        },
                        ...fullProductIncludeArgs
                    })
                    return convertProducts(products, language)
            }
        } catch (e) {
            console.log(e)
            throw e;
        }
    }),

    getProductByCategory: publicProcedure.input(z.object({
        slug: z.string(),
        language: languageInput,
        params: categorySearchParamsSchema
    })).query(async ({input}) => {

            try {

                const minMaxParams = input.params?.max && input.params?.min ? {
                    variants: {
                        some: {
                            isMain: true,
                            price: {
                                lte: Number(input.params?.max),
                                gte: Number(input.params?.min),
                            }
                        }
                    }
                } : {}

                const category = await prisma.category.findUnique({
                    where: {
                        id: input.slug,
                    },
                    include: {
                        textFields_ru: true,
                        textFields_uz: true,
                    }
                })

                let products = await prisma.product.findMany({
                    where: {
                        categoryId: input.slug,
                        ...minMaxParams
                    },
                    ...fullProductIncludeArgs
                })

                if (!category) throw new TRPCError({message: 'Category is not found', code: 'NOT_FOUND'})


                const variants = await prisma.variant.aggregate({
                    where: {
                        Product: {
                            category: {
                                id: input.slug
                            }
                        },
                        isMain: true
                    },
                    _min: {
                        price: true
                    },
                    _max: {
                        price: true
                    },
                })

                let convertedProducts = convertProducts(products, input.language)

                if (input.params?.order) {
                    if (input.params.order === 'price_asc') {
                        convertedProducts = convertedProducts.sort((a, b) => a.variants[0].price - b.variants[0].price)
                    } else if (input.params.order === 'price_desc') {
                        convertedProducts = convertedProducts.sort((a, b) => b.variants[0].price - a.variants[0].price)
                    } else if (input.params.order === 'discount_desc') {
                        convertedProducts.sort((a, b) => {
                            const discountPercentA = (Number(a?.variants[0].oldPrice) - a?.variants[0].price) * 100 / Number(Number(a?.variants[0].oldPrice).toFixed(2)) || 0
                            const discountPercentB = (Number(b?.variants[0].oldPrice) - b?.variants[0].price) * 100 / Number(Number(b?.variants[0].oldPrice).toFixed(2)) || 0
                            return discountPercentB - discountPercentA;
                        });
                    } else {
                        convertedProducts = convertedProducts.sort((a, b) => Number(a.createdAt) - Number(b.createdAt))
                    }
                }

                return {
                    category: convertCategory(category, input.language),
                    products: convertedProducts,
                    min: variants._min.price,
                    max: variants._max.price,
                    order: input.params?.order || 'date_desc'
                };
                // console.log();
            } catch
                (e) {
                console.log(e);
            }
        }
    ),
    getSuggestedProductsByCategories: publicProcedure.input(z.object({
        language: languageInput,
        categories: z.array(z.string()),
    })).query(async ({input}) => {
        try {
            return await getSuggestedProducts(input.categories, input.language)
        } catch (e) {
            console.log(e);
        }
    }),

    getVariantBySkuCrmId: protectedProcedure.input(z.object({
        sku: z.string(),
        crmId: z.string(),
        id: z.any(),
    })).mutation(async ({input}) => {
        try {

            var variant = await prisma.variant.findFirst({
                where: {
                  OR: [
                    {
                      sku: input.sku
                    },
                    {
                      crmId: input.crmId
                    }
                  ]
                }
            })

            return {variant: variant, id: input.id};
        } catch (e) {
            console.log(e);
        }
    }),
})
