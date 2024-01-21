import {RouterOutput} from "@/app/_trpc/client";
import {z} from "zod";

export type FullQuestion = RouterOutput['question']['getQuestion']
export const questionInput = z.object({
    id: z.string().optional(),
    question: z.string().min(1, 'Поле обязательное'),
    answer: z.string().min(1, 'Поле обязательное'),
})

export const questionsSchema = z.object({
    questions: z.array(questionInput)
})

export type QuestionFormValues = z.infer<typeof questionsSchema>