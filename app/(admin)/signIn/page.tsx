'use client'
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form} from "@/components/ui/form";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import FormInput from "@/components/ui/custom/FormInput";
import {Button} from "@/components/ui/button";
import toast from "react-hot-toast";
import {signIn} from "next-auth/react";
import {useRouter} from "next/navigation";

const adminSignInValidation = z.object({
    password: z.string().nonempty("Поле обязательное").min(8, 'Минимальное количество знаков - 8')
})

type SignInBody = z.infer<typeof adminSignInValidation>
const Page = () => {

    const router = useRouter()

    const methods = useForm<SignInBody>({
        defaultValues: {
            password: ''
        },
        mode: 'onBlur',
        resolver: zodResolver(adminSignInValidation)
    })

    const submitHandler = async (data: SignInBody) => {
        try {
            await toast.promise(signIn("credentials", {
                redirect: false,
                email: "ADMIN",
                password: data?.password
            }), {
                loading: 'Вход...',
                success: (res) => {
                    if (res?.error) throw new Error(res.error)
                    router.push('/adminpanel')
                    return 'Вход успешный'
                },
                error: (e) => {
                    return e.message
                }
            })
        } catch (e) {
            console.log(e)
        }
    }
    return (
        <div className={'flex flex-col w-full h-[70vh] items-center justify-center p-5'}>

                <Card className={'max-w-2xl w-full border-pink-200'}>
                    <Form {...methods}>
                        <CardHeader>
                            <CardTitle className={'border-b pb-4'}>Вхід у адмінпанель</CardTitle>
                        </CardHeader>
                            <CardContent>
                                    <FormInput
                                        type={'password'}
                                        name={'password'}
                                        control={methods.control}
                                        label={'Пароль'}
                                        description={'Введите пароль для входа в админ панель'}
                                        placeholder={'Введите пароль...'}
                                    />
                            </CardContent>
                        <CardFooter>
                            <Button onClick={methods.handleSubmit(submitHandler)}>Войти</Button>
                        </CardFooter>
                    </Form>
                </Card>
        </div>

    );
};

export default Page;