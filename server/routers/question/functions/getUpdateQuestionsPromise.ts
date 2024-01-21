import prisma from "@/prisma/client";
import {$Enums} from "@prisma/client";
import {QuestionFormValues} from "@/types/question";

export const getUpdateQuestionsPromises = async (questions: QuestionFormValues['questions'], language: $Enums.Language) => {

    const oldQuestions = await prisma.questionItem.findMany({
        where: {
            productId: null
        },
        select: {
            id: true
        }
    })

    const questionsToDelete = oldQuestions?.filter((oldQuestion) => {
            return !questions?.some(
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

    let updateQuestionsPromises = questions?.map(question => {

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
                ...createTranslations
            }
        })
    })

    if (!updateQuestionsPromises?.length) {
        updateQuestionsPromises = []
    }

    return {
        updatePromises: updateQuestionsPromises,
        deletePromises: questionsToDeletePromises
    }
}