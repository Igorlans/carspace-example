import {protectedProcedure, publicProcedure, router} from "@/server/trpc";
import prisma from "@/prisma/client";
import {z} from "zod";
import {TRPCError} from "@trpc/server";
import {languageInput} from "@/types/types";
import {questionInput} from "@/types/question";
import {convertQuestion, convertQuestions, fullQuestionIncludeArgs} from "@/utils/convertQuestion";
import {getUpdateQuestionsPromises} from "@/server/routers/question/functions/getUpdateQuestionsPromise";
import {revalidatePath} from "next/cache";
export const questionRouter = router({
    upsertQuestion: protectedProcedure.input(z.object({
        questions: z.array(questionInput),
        language: languageInput
    })).mutation(async ({input: {questions, language}}) => {
        const {updatePromises, deletePromises} = await getUpdateQuestionsPromises(questions, language)
        await prisma.$transaction([...updatePromises, ...deletePromises]);

        revalidatePath('/(client)/[locale]/products/[slug]')
    }),

    getQuestion: publicProcedure.input(z.object({
        id: z.string(),
        language: languageInput
    })).query(async ({input: {id, language}}) => {
        const question = await prisma.questionItem.findUnique({
            where: {
                id
            },
            include: fullQuestionIncludeArgs.include
        })

        if (!question) {
            throw new TRPCError({message: 'There is no such category', code: 'NOT_FOUND'})
        }

        return convertQuestion(question, language);
    }),

    getCommonQuestions: publicProcedure.input(languageInput).query(async ({input}) => {

        const questions = await prisma.questionItem.findMany({
            where: {
                productId: null
            },
            include: fullQuestionIncludeArgs.include
        })

        return convertQuestions(questions, input);
    })


})