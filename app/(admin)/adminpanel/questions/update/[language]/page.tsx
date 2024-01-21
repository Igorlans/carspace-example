import {$Enums} from "@prisma/client";
import {serverClient} from "@/app/_trpc/serverClient";
import QuestionForm from "@/app/(admin)/adminpanel/questions/_components/QuestionForm";

const Page = async ({params}: {params: {language: $Enums.Language}}) => {

    const questions = await serverClient.question.getCommonQuestions(params.language)


    return (
        <QuestionForm commonQuestions={questions} language={params.language} />
    );
};

export default Page;