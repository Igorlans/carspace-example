'use client'

import {FC, useEffect} from "react";
import {FullQuestion} from "@/types/question";
import {useRouter} from "next/navigation";
import Questions from "@/app/(client)/[locale]/products/(components)/(tabs)/Questions";

interface IQuestionsProps {
    questions: FullQuestion[]
}
const QuestionsTable: FC<IQuestionsProps> = ({
    questions
                                        }) => {

    const router = useRouter()

    useEffect(() => {
        router.refresh()
    }, [])

    return (
        <Questions questions={questions} />
    );
};

export default QuestionsTable;