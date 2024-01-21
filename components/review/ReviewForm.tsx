import { FC } from 'react'
import {useFieldArray, useForm, useWatch} from 'react-hook-form'
import type { RewiewFormValues } from '@/types/product';
import { Form } from '../ui/form';
import FormInput from '../ui/custom/FormInput';
import FormTextarea from '../ui/custom/FormTextarea';
import { Button } from '../ui/button';
import FormRating from '../ui/custom/FormRating';
import FormCheckbox from '../ui/custom/FormCheckbox';
import FormImage from "@/components/ui/custom/FormImage";
import FormImageMultiple from "./FormImageMultiple";
import FormImageCustomMultiple from "./FormImageCustomMultiple";
import {ScrollArea} from "@/components/ui/scroll-area";
import List from "@/app/(admin)/adminpanel/components/List";
import {zodResolver} from "@hookform/resolvers/zod";
import {reviewSchema} from "@/types/product";
import {toast} from "react-hot-toast";
import {trpc} from "@/app/_trpc/client";
import {fi} from "date-fns/locale";

interface ReviewFormProps {
  setOpen: (newValue: boolean) => void;
  productId: string
}

const ReviewForm: FC<ReviewFormProps> = ({ setOpen, productId }) => {

    const defaultValues: RewiewFormValues = {
        name: "",
        phone: "",
        rating: 0,
        comment: "",
        status: "ON_MODERATION",
        file: "",
        isPublic: true,
        productId
    }

    const form = useForm<RewiewFormValues>({
        resolver: zodResolver(reviewSchema),
        defaultValues,
        mode: "onBlur"
    })

    const mutateOptions = {
        onMutate: () => {
            toast.loading("Отправка отзыва", {id: 'loading'})
        },
        onSuccess: () => {
            toast.success("Спасибо за Ваш отзыв")
            setOpen(false)
            form.reset()
        },
        onSettled: () => {
            toast.dismiss('loading')
        },
        onError: (e: any) => {
            toast.error("Что-то пошло не так. Попробуйте позже")
            console.log(e);
        }
    }

    const saveReview = trpc.product.createReview.useMutation(mutateOptions)
    async function sendReview(data: RewiewFormValues) {
        try {
            saveReview.mutate(data)
        } catch (e: any) {
            console.log(e);
        }
    }

    const {file, file2, file3} = useWatch({
        control: form.control,
    })

    const files = [];

    const updateFiles = (url: string) => {

        var tempFile1 = form.getValues('file');
        var tempFile2 = form.getValues('file2');
        var tempFile3 = form.getValues('file3');
        console.log('file 1', tempFile1);
        console.log('file 2', tempFile2);
        console.log('file 3', tempFile3);

        if(!tempFile1){
          form.setValue('file', url);
        } else if(! tempFile2) {
          form.setValue('file2', url);
        } else if(! tempFile3) {
          form.setValue('file3', url);
        }

    }


    return (
      <>
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(sendReview)}
            >
                <ScrollArea className={'h-[55vh]'}>
                    <List>
                        <FormRating
                            name="rating"
                            control={form.control}
                            label='Оценка'
                        />
                        <FormInput
                            name="name"
                            control={form.control}
                            label="Имя"
                        />
                        <FormInput
                            name="phone"
                            control={form.control}
                            label="Телефон"
                        />
                        <FormTextarea
                            name="comment"
                            control={form.control}
                            label="Ваш отзыв"
                        />
                        <div className={'grid grid-cols-2 gap-y-5'}>
                            {/*<FormImageMultiple
                                name={'file'}
                                aspectRatio={0}
                                control={form.control}
                                label={'Фото'}
                                showSkipCropButton={true}
                                multiple={true}
                                cropping={false}
                                updateFiles={updateFiles}
                            />*/}
                            <FormImageCustomMultiple
                                name={'file'}
                                aspectRatio={0}
                                control={form.control}
                                label={'Фото'}
                                showSkipCropButton={true}
                                multiple={true}
                                cropping={false}
                                updateFiles={updateFiles}
                            />
                            {
                              form.getValues('file2') &&
                              <FormImage
                                  name={'file2'}
                                  aspectRatio={0}
                                  control={form.control}
                                  label={'Фото 2'}
                              />
                            }

                            {
                              form.getValues('file3') &&
                              <FormImage
                                  name={'file3'}
                                  aspectRatio={0}
                                  control={form.control}
                                  label={'Фото 3'}
                              />
                            }
                        </div>

                        <FormCheckbox
                            name={"isPublic"}
                            control={form.control}
                            label={'Публичный отзыв'}
                            description={'Можно ли опубликовать ваш отзыв на странице товара'}
                        />

                    </List>

                </ScrollArea>
                <Button
                    className={'mt-5 w-full'}
                    type={"submit"}
                    variant={"primary"}
                    size={"lg"}
                >отправить</Button>


            </form>
        </Form>
      </>
    )
}

export default ReviewForm
