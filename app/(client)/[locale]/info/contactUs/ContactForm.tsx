"use client"

import {FC, ReactNode} from 'react'

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Form } from '@/components/ui/form';
import FormInput from '@/components/ui/custom/FormInput';
import { Button } from '@/components/ui/button';

import sendTelegram from '@/utils/telegramRequest';
import FormTextarea from '@/components/ui/custom/FormTextarea';
import toast from 'react-hot-toast';
import { useTranslations } from 'use-intl';

const contactSchema = z.object({
    email: z.string().email({
        message: "Неверный формат"
    }),
    message: z.string().nonempty({
        message: "Сообщение не долно быть пустым"
    })
  })
  
type contactSchemaValues = z.infer<typeof contactSchema>

interface ContactFormProps {
    label: string | ReactNode,
    button: string | ReactNode
}

const ContactForm: FC<ContactFormProps> = ({ label, button }) => {
    const t = useTranslations("validation")
    const defaultValues: contactSchemaValues = {
      email: "",
      message: ""
    }
    const form = useForm<contactSchemaValues>({
      resolver: zodResolver(contactSchema),
      defaultValues,
      mode: "onBlur"
    })

    const sendMessage = async (data: contactSchemaValues) => {
const message = `
email: ${data.email}
message: ${data.message}
`       
        try {
            toast.promise(sendTelegram(message), {
                loading: t("sending"),
                success: () => {
                    form.reset()
                    return t("sent")
                },
                error: t("error")
            })
            
        } catch (e) {
            console.log(e);
            toast.error("")
        }
    }

    return (
        <>
            <Form {...form}>
                <div className='flex flex-col  gap-y-4'>
                    <FormInput 
                        name="email"
                        control={form.control}
                        label="Email"
                    />
                    <FormTextarea 
                        name="message"
                        control={form.control}
                        label={label as string}
                    />
                    <Button
                        variant="primary" 
                        size="full"
                        className='max-w-[300px] mx-auto'
                        onClick={form.handleSubmit(sendMessage)}
                    >
                        {button}
                    </Button>
                </div>
            </Form>
        </>
    )
}

export default ContactForm