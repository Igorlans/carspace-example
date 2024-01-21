'use client'
import {$Enums} from "@prisma/client";
import {FC} from "react";
import {useFieldArray, useForm, useWatch} from "react-hook-form";
import toast from "react-hot-toast";
import {trpc} from "@/app/_trpc/client";
// import {useRouter} from "next/navigation";
import PageTitle from "@/app/(admin)/adminpanel/components/PageTitle";
import IconButton from "@/app/(admin)/adminpanel/components/IconButton";
import {BiSave} from "react-icons/bi";
import {zodResolver} from "@hookform/resolvers/zod";
import FormCard from "@/components/adminpanel/FormCard";
import FormInput from "@/components/ui/custom/FormInput";
import List from "@/app/(admin)/adminpanel/components/List";
import {Form} from "@/components/ui/form";
import {GrNotes} from "react-icons/gr";
import Title from "@/app/(admin)/adminpanel/components/Title";
import {LuList, LuPlus, LuTrash} from "react-icons/lu";
import {Button} from "@/components/ui/button";
import FormTextarea from "@/components/ui/custom/FormTextarea";
import {FullQuestion, QuestionFormValues, questionsSchema} from "@/types/question";
import Breadcrumbs from "@/app/(admin)/adminpanel/components/Breadcrumbs";


interface IQuestionFormProps {
    commonQuestions: FullQuestion[];
    language: $Enums.Language;
}




const QuestionForm: FC<IQuestionFormProps> = ({
                                                  commonQuestions,
                                                  language,
                                              }) => {

    const breadCrumbs = [
        {text: 'Главная', href: '/adminpanel'},
        {text: 'Вопросы', href: '/adminpanel/questions'},
        {text: `Редактирование "${language.toUpperCase()}"`, href: `/adminpanel/questions/${language}`}
    ]

    // const router = useRouter()


    const methods = useForm<QuestionFormValues>({
        defaultValues: {
            questions: commonQuestions || []
        },
        resolver: zodResolver(questionsSchema)
    })


    const mutateOptions = {
        onMutate: () => toast.loading('Редактирование вопросов...', {id: 'loading'}),
        onSettled: () => toast.dismiss('loading'),
        onSuccess: () => {
            toast.success('Вопросы отредактированы')
            // router.push('/adminpanel/questions')
        },
        onError: () => toast.error('Ошибка редактирования вопросов')

    }

    const upsertQuestions = trpc.question.upsertQuestion.useMutation(mutateOptions)

    const submitHandler = (data: QuestionFormValues) => {
        try {
            upsertQuestions.mutate({questions: data.questions, language})
        } catch (e) {
            console.log(e)
        }
    }


    const {fields: questions, append: createQuestion, remove: deleteQuestion} = useFieldArray({
        control: methods.control,
        name: 'questions',
        keyName: 'formId'
    })


    console.log('form vals ============= ', methods.watch())


    return (
        <div>
            <Breadcrumbs links={breadCrumbs} />

            <PageTitle
                title={'Редактиование вопросов'}
                description={'Редактирование общих вопросов на сайте'}
                icon={<LuList className={'text-3xl'}/>}
            >
                <div
                    className='flex gap-x-2'
                    onClick={methods.handleSubmit(submitHandler)}
                >
                    <IconButton
                        icon={<BiSave className={'text-base'}/>}
                    >
                        Сохранить
                    </IconButton>
                </div>
            </PageTitle>
            <Form {...methods}>
                <FormCard className={'mt-5'}>
                    <Title icon={<GrNotes className={'text-lg'}/>} className={'mb-6'}>Вопрос/Ответ</Title>
                    <List>
                        {questions?.map((question, index) =>
                            <FormCard key={index}>
                                <Title className={'mb-4'}>
                                    <div className={'flex justify-between items-center w-full'}>
                                        <div>{methods.watch(`questions.${index}.question`) || 'Вопрос ' + (index + 1)}</div>
                                        <Button
                                            variant={'ghost'}
                                            onClick={() => deleteQuestion(index)}>
                                            <LuTrash className={'text-lg'}/>
                                        </Button>
                                    </div>
                                </Title>
                                <div className={'grid grid-cols-1 md:grid-cols-2 gap-8'}>
                                    <FormInput name={`questions.${index}.question`} control={methods.control}
                                               label={'Вопрос'}/>
                                    <FormTextarea name={`questions.${index}.answer`} control={methods.control}
                                                  label={'Ответ'}/>
                                </div>

                            </FormCard>
                        )}
                        <IconButton
                            className={"self-start"}
                            onClick={() => createQuestion({
                                answer: '',
                                question: '',
                            })}
                            icon={<LuPlus className={'text-sm'}/>}
                        >
                            Добавить вопрос
                        </IconButton>

                    </List>
                </FormCard>

                {/*<div>*/}
                {/*    <div >*/}
                {/*        <code>Values : {JSON.stringify(methods.watch(), undefined, 4)}</code>*/}
                {/*    </div>*/}
                {/*    <div >*/}
                {/*        <code>*/}
                {/*            ERRORS : {JSON.stringify(methods.formState.errors, undefined, 4)}*/}
                {/*        </code>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </Form>
        </div>
    );
};

export default QuestionForm;