import {$Enums, Prisma} from "@prisma/client";

export const fullQuestionIncludeArgs = {
    include: {
        textFields_ru: true,
        textFields_uz: true
    }
}

export type FullQuestion = Prisma.QuestionItemGetPayload<typeof fullQuestionIncludeArgs>


export const convertQuestion = (question: FullQuestion, language: $Enums.Language) => {
    const translation = question[`textFields_${language}`] || question[`textFields_ru`]
    const formedQuestion = {
        ...question,
        question: translation?.question,
        answer: translation?.answer,
    }
    const { textFields_ru, textFields_uz, ...otherProps} = formedQuestion
    return otherProps
}

export const convertQuestions = (questions: FullQuestion[], language: $Enums.Language) => {
    return questions.map(question => convertQuestion(question, language))
}