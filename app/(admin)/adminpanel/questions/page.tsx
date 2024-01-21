import {serverClient} from "@/app/_trpc/serverClient";
import Breadcrumbs from "@/app/(admin)/adminpanel/components/Breadcrumbs";
import PageTitle from "@/app/(admin)/adminpanel/components/PageTitle";
import {HiOutlineTemplate} from "react-icons/hi";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import QuestionsTable from "@/app/(admin)/adminpanel/questions/_components/Questions";

const Page = async () => {

    const questions = await serverClient.question.getCommonQuestions('ru')

    const breadCrumbs = [
        {text: 'Главная', href: '/adminpanel'},
        {text: 'Вопросы', href: '/adminpanel/questions'},
    ]


    return (
        <div>
            <Breadcrumbs links={breadCrumbs} />

            <PageTitle
                title={'Общие вопросы'}
                description={'Список общих вопросов'}
                icon={<HiOutlineTemplate className={'text-3xl'}/>}
            >
                <div className={'flex gap-4'}>
                    <Link href="/adminpanel/questions/update/ru">
                        <Button>
                            RU
                        </Button>
                    </Link>
                    <Link href="/adminpanel/questions/update/uz">
                        <Button>
                            UZ
                        </Button>
                    </Link>
                </div>
            </PageTitle>

           <QuestionsTable questions={questions} />

        </div>
    );
};

export default Page;

