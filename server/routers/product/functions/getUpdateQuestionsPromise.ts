import prisma from "@/prisma/client";
import {ProductFormValues} from "@/types/product";
import {$Enums} from "@prisma/client";

export const getUpdateQuestionsPromises = async (product: ProductFormValues, language: $Enums.Language) => {

    const oldProduct = await prisma.product.findUnique({
        where: {
            id: product.id
        },
        select: {
            questions: {
                select: {
                    id: true
                }
            }
        }
    })

    const questionsToDelete = oldProduct?.questions
        .filter((oldQuestion) => {
            return !product?.questions?.some(
                (newQuestion) =>
                    newQuestion?.id === oldQuestion?.id
            )
        })


    let questionsToDeletePromises = questionsToDelete?.map(question => {
        return prisma.questionItem.delete({
            where: {
                id: question.id
            }
        })
    })

    if (!questionsToDeletePromises?.length) {
        questionsToDeletePromises = []
    }

    let updateQuestionsPromises = product?.questions?.map(question => {

        const updateTranslations = {
            textFields_ru: language === 'ru' ? {
                upsert: {
                    update: {
                        answer: question.answer,
                        question: question.question,
                    },
                    create: {
                        answer: question.answer,
                        question: question.question,
                        language
                    }
                }

            } : undefined,
            textFields_uz: language === 'uz' ? {
                upsert: {
                    update: {
                        answer: question.answer,
                        question: question.question,
                    },
                    create: {
                        answer: question.answer,
                        question: question.question,
                        language
                    }
                }

            } : undefined,
        }

        const createTranslations = {
            textFields_ru: language === 'ru' ? {
                create: {
                    answer: question.answer,
                    question: question.question,
                    language
                }
            } : undefined,
            textFields_uz: language === 'uz' ? {
                create: {
                    answer: question.answer,
                    question: question.question,
                    language
                }
            } : undefined,
        }

        return prisma.questionItem.upsert({
            where: {
                id: question?.id || 'create'
            },
            update: {
                ...updateTranslations
            },
            create: {
                productId: product.id,
                ...createTranslations
            }
        })
    })

    if (!updateQuestionsPromises?.length) {
        updateQuestionsPromises = []
    }

    return [...updateQuestionsPromises, ...questionsToDeletePromises]
}