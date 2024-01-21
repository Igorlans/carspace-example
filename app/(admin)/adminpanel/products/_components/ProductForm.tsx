'use client'
import {FullProduct, ProductFormValues, productSchema} from "@/types/product";
import {$Enums} from "@prisma/client";
import {FC, useMemo} from "react";
import {useFieldArray, useForm, useWatch} from "react-hook-form";
import toast from "react-hot-toast";
import {trpc} from "@/app/_trpc/client";
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
import {LuBox, LuImage, LuList, LuPlus, LuTrash} from "react-icons/lu";
import FormImage from "@/components/ui/custom/FormImage";
import {Button} from "@/components/ui/button";
import FormSelect from "@/components/ui/custom/FormSelect";
import {FullCategory} from "@/types/category";
import FormTextarea from "@/components/ui/custom/FormTextarea";
import FormPickReview from "@/app/(admin)/adminpanel/products/_components/FormPickReview";
import RelatedProducts from "@/app/(admin)/adminpanel/products/_components/RelatedProducts";
import FormVideo from "@/components/ui/custom/FormVideo";
import FormSwitch from "@/components/ui/custom/FormSwitch";
import FormPickPhoto from "@/components/ui/custom/FormPickPhoto";

import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';
import ClientProvider from "@/providers/client-provider";
import {useRouter} from "next/navigation";

import FormImageCustom from "@/components/ui/custom/media-hosting/FormImageCustom";
import FormVideoCustom from "@/components/ui/custom/media-hosting/FormVideoCustom";


const availabilityOptions = [
    {
        label: 'Есть в наличии',
        value: 'IN_STOCK'
    },
    {
        label: 'Заканчиваеться',
        value: 'RUNS_OUT'
    },
    {
        label: 'Нет в наличии',
        value: 'OUT_OF_STOCK'
    },
]


interface IProductFormProps {
    product?: FullProduct;
    language: $Enums.Language;
    categories: FullCategory[]
}

const ProductForm: FC<IProductFormProps> = ({
                                                product,
                                                language,
                                                categories
                                            }) => {

    const categoryOptions = categories?.map((category) => ({label: category.title, value: category.id}))

    const router = useRouter()

    const isUpdate = !!product;

    const pageTitle = isUpdate ? 'Редактирование товара' : 'Создание товара';
    const pageSubtitle = isUpdate ? `Создание товара "${product?.variants[0].title}"` : 'Создание нового товара Carspace';

    const loadingMessage = isUpdate ? 'Обновление товара...' : 'Создание товара...';
    const successMessage = isUpdate ? 'Товар обновлен' : 'Товар создан';
    const errorMessage = isUpdate ? 'Ошибка обновления товара' : 'Ошибка создания товара';
    const errorMessageVariant = 'Вариация существует (SKU / CRM ID):\n\n';


    const methods = useForm<ProductFormValues>({
        defaultValues: {
            images: product?.images as ProductFormValues['images'] || [],
            id: product?.id,
            categoryId: product?.categoryId || undefined,
            specs: product?.specs || [],
            questions: product?.questions || [],
            onFresh: product?.onFresh || false,
            onBestsellers: product?.onBestsellers || false,
            isSuggested: product?.isSuggested || false,
            variants: product?.variants as ProductFormValues['variants'] || [{
                title: '',
                subtitle: '',
                image: {
                    id: '',
                    name: '',
                    url: ''
                },
                crmId: '',
                sku: '',
                availability: 'IN_STOCK',
                price: 1300,
                oldPrice: undefined
            }],
            landing: product?.landing ? {
                id: product.landing?.id,
                reviewId: product.landing.reviewId || undefined,
                title: product.landing.title,
                subtitle: product.landing.subtitle || '',
                isVideo: product.landing.isVideo,
                featureItem_1: product.landing.featureItem_1,
                featureItem_2: product.landing.featureItem_2,
                featureItem_3: product.landing.featureItem_3,
                description_title_1: product.landing.description_title_1,
                description_text_1: product.landing.description_text_1,
                description_title_2: product.landing.description_title_2,
                description_text_2: product.landing.description_text_2,
                description_title_3: product.landing.description_title_3,
                description_text_3: product.landing.description_text_3,
                image1: product.landing.image1,
                image2: product.landing.image2,
                image3: product.landing.image3 || '',
                image4: product.landing.image4 || '',
                isVideo4: product.landing.isVideo4,
                block_4: product.landing.block_4,
                title_4: product.landing.title_4 || '',
                subtitle_4: product.landing.subtitle_4 || '',
                featureItem_4_1: product.landing.featureItem_4_1 || '',
                featureItem_4_2: product.landing.featureItem_4_2 || '',
                featureItem_4_3: product.landing.featureItem_4_3 || '',

            } : undefined,
            relatedProducts: product?.relatedProducts?.map(product => ({
                id: product.id,
                name: product.variants[0].title
            })) || [],
            video: product?.video || ''
        },
        resolver: zodResolver(productSchema)
    })


    console.log('errors =======', methods.formState.errors)


    const mutateOptions = {
        onMutate: () => toast.loading(loadingMessage, {id: 'loading'}),
        onSettled: () => toast.dismiss('loading'),
        onSuccess: (result: any) => {
            // console.log("Created product", result)
            toast.success(successMessage)
            !isUpdate && result?.id && router.push(String("/adminpanel/products/").concat(result.id).concat('/').concat(language))
            // router.push('/adminpanel/products')
        },
        onError: () => toast.error(errorMessage)

    }

    const mutateOptionsVariants = {
        onSuccess: (result: any) => {
            console.log("Variants DB", result?.variant);
            console.log("Variant ID", result?.id);

            if(!result.variant){
              return true;
            }

            if((result.id && result.id !== result.variant?.id) || (!result.id)){
              // toast.error(errorMessage);
              toast.error(String(errorMessageVariant).concat(result.variant?.sku).concat(' / ').concat(result.variant?.crmId));
            }

            return result;

        },
        onError: () => toast.error(errorMessage)
    }

    const createProduct = trpc.product.createProduct.useMutation(mutateOptions)
    const updateProduct = trpc.product.updateProduct.useMutation(mutateOptions)
    const getVariants = trpc.product.getVariantBySkuCrmId.useMutation(mutateOptionsVariants)

    const submitHandler = async (data: ProductFormValues) => {
        try {

            // Checks the sku and crmId of variations
            var variantError = false;
            for (let i = 0; i < data?.variants.length; i++) {
              var variant = data.variants[i];
              // const variantsDb = getVariants.mutate({sku: variant.sku, crmId: variant.crmId});
              const variantsDb = await getVariants.mutate({sku: variant.sku, crmId: variant.crmId, id: variant.id});
            }

            isUpdate
                ? updateProduct.mutate({product: data, language})
                : createProduct.mutate({product: data, language})
        } catch (e) {
            console.log(e)
        }
    }

    const {fields: variants, append: createVariant, remove: deleteVariant} = useFieldArray({
        control: methods.control,
        name: 'variants',
        keyName: 'formId'
    })

    const {fields: images, append: createImage, remove: deleteImage, move, swap} = useFieldArray({
        control: methods.control,
        name: 'images',
        keyName: 'formId'
    })

    const {fields: specs, append: createSpec, remove: deleteSpec} = useFieldArray({
        control: methods.control,
        name: 'specs',
        keyName: 'formId'
    })

    const {fields: questions, append: createQuestion, remove: deleteQuestion} = useFieldArray({
        control: methods.control,
        name: 'questions',
        keyName: 'formId'
    })

    const {landing, relatedProducts, video} = useWatch({
        control: methods.control,
    })

    const reviewImages = useMemo(() => {
        const pickedReview = product?.reviews.find(review => review.id === landing?.reviewId)

        if (!pickedReview) return;

        return [pickedReview.file, pickedReview.file2, pickedReview.file3].filter(photo => {
            if (Boolean(photo)) {
                return true
            } else {
                return false
            }
        }) as string[]
    }, [landing?.reviewId])

    console.log('form vals ============= ', methods.watch())

    const onDragEnd = (result: any) => {
        if (!result.destination) return
        move(result.source.index, result.destination.index)
    };


    return (
        <div>
            <PageTitle
                title={pageTitle}
                description={pageSubtitle}
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
                <List>
                    <div className={'mt-10 grid gap-8 grid-cols-1 md:grid-cols-2'}>
                        <FormCard>
                            <Title icon={<GrNotes className={'text-lg'}/>} className={'mb-6'}>Основная
                                информация</Title>
                            <List>
                                <FormInput name={'variants.0.title'} control={methods.control} label={"Заголовок"}/>
                                <FormInput name={'variants.0.subtitle'} control={methods.control}
                                           label={"Подзаголовок"}/>
                                <FormSelect
                                    className={'max-w-[300px]'}
                                    defaultValue={product?.categoryId || ''}
                                    name={'categoryId'}
                                    control={methods.control}
                                    label={'Категория'}
                                    placeholder={'Категория'}
                                    options={categoryOptions}
                                />
                                <FormInput name={'variants.0.price'} control={methods.control} label={"Цена"}/>
                                <FormInput name={'variants.0.oldPrice'} control={methods.control}
                                           label={"Старая цена"}/>
                                <FormInput name={'variants.0.sku'} control={methods.control} label={"Артикул"}/>
                                <FormInput name={'variants.0.crmId'} control={methods.control} label={"CRM ID"}/>
                                <FormSelect
                                    className={'max-w-[300px]'}
                                    name={`variants.0.availability`}
                                    control={methods.control}
                                    label={'Наличие'}
                                    defaultValue={variants?.[0].availability || 'IN_STOCK'}
                                    placeholder={'Наличие'}
                                    options={availabilityOptions}
                                />
                                <FormSwitch name={'onFresh'} control={methods.control} label={'Новинка'}
                                            description={'Появится ли продукт на главной, в слайдере "Новинки"'}/>
                                <FormSwitch name={'onBestsellers'} control={methods.control} label={'Бестселлер'}
                                            description={'Появится ли продукт на главной, в слайдере "Бестселлеры"'}/>
                                <FormSwitch name={'isSuggested'} control={methods.control} label={'Предлагать продукт'}
                                            description={'Появится ли продукт при оформлении заказа, в слайдере "Вам также понравится"'}/>
                                <RelatedProducts value={relatedProducts as { id: string, name: string }[] || []}
                                                 setValue={(newValue) => methods.setValue('relatedProducts', newValue)}/>

                                <FormImageCustom name={ `variants.0.image.url`}
                                           control={methods.control}
                                           label={'Фото'}
                                           siteEntity={"Image"}
                                           siteEntityField={"url"}
                                           siteEntityId={"new"}
                                           compressionType={"light"}
                                />

                                <FormVideoCustom name={`video`}
                                           control={methods.control}
                                           label={'Видео'}
                                           siteEntity={"Product"}
                                           siteEntityField={"video"}
                                           siteEntityId={"new"}
                                />
                            </List>
                        </FormCard>
                        <FormCard>
                            <Title icon={<LuImage className={'text-xl'}/>} className={'mb-6'}>Фото
                                ({images.length}/10)</Title>
                            <ClientProvider>
                                <DragDropContext onDragEnd={onDragEnd}>
                                    <Droppable droppableId="droppable">
                                        {(provided) => (
                                            <div {...provided.droppableProps} ref={provided.innerRef}
                                                 className={'grid grid-cols-1 gap-5 xl:grid-cols-2'}>
                                                {images?.map((image, index) =>
                                                    <Draggable key={image.formId} draggableId={image.formId as string} index={index}>
                                                        {(provided) => (
                                                            <div
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                                ref={provided.innerRef}
                                                            >
                                                                <FormCard
                                                                    className={'flex justify-center items-center min-h-[310px]'}>

                                                                    <FormImageCustom name={`images.${index}.url`}
                                                                               control={methods.control}
                                                                               label={
                                                                                   <div
                                                                                       className={'flex justify-between items-center'}>
                                                                                       <div>
                                                                                           Фото {index + 1}
                                                                                       </div>
                                                                                       <Button size={'sm'} variant={'ghost'}
                                                                                               onClick={() => deleteImage(index)}>
                                                                                           <LuTrash className={'text-sm'}/>
                                                                                       </Button>
                                                                                   </div>
                                                                               }
                                                                               siteEntity={"Image"}
                                                                               siteEntityField={"url"}
                                                                               siteEntityId={"new"}
                                                                               compressionType={"light"}
                                                                    />
                                                                </FormCard>

                                                            </div>

                                                        )}

                                                    </Draggable>
                                                )}
                                                {provided.placeholder}
                                                <div className={'flex justify-center items-center'}>
                                                    <IconButton
                                                        onClick={() => {
                                                            if (images.length === 10) return toast.error('Максимальное количество - 10')
                                                            createImage({
                                                                url: '',
                                                                name: `Фото ${images?.length + 1}`
                                                            })
                                                        }}
                                                        icon={<LuPlus className={'text-sm'}/>}
                                                    >
                                                        Добавить фото
                                                    </IconButton>
                                                </div>

                                            </div>
                                        )}
                                    </Droppable>
                                </DragDropContext>
                            </ClientProvider>



                        </FormCard>
                    </div>

                    <FormCard>
                        <Title icon={<GrNotes className={'text-lg'}/>} className={'mb-6'}>Вариации</Title>
                        <div className={'grid grid-cols-1 gap-5 md:grid-cols-2'}>
                            {variants?.slice(1)?.map((variant, index) => {
                                    const newIndex = index + 1;

                                    return (
                                        <FormCard key={variant.formId}>
                                            <Title className={'mb-5 text-md'}
                                                   icon={<LuBox className={'text-lg'}/>}>
                                                <div className={'flex justify-between items-center w-full'}>
                                                    <div>{methods.watch(`variants.${newIndex}.title`) || 'Вариация ' + newIndex}</div>
                                                    <Button
                                                        variant={'ghost'}
                                                        onClick={() => deleteVariant(newIndex)}>
                                                        <LuTrash className={'text-lg'}/>
                                                    </Button>
                                                </div>
                                            </Title>
                                            <List>
                                                <FormInput name={`variants.${newIndex}.title`} control={methods.control}
                                                           label={"Заголовок"}/>
                                                <FormInput name={`variants.${newIndex}.subtitle`} control={methods.control}
                                                           label={"Подзаголовок"}/>
                                                <FormInput name={`variants.${newIndex}.price`} control={methods.control}
                                                           label={"Цена"}/>
                                                <FormInput name={`variants.${newIndex}.oldPrice`} control={methods.control}
                                                           label={"Старая цена"}/>
                                                <FormInput name={`variants.${newIndex}.sku`} control={methods.control}
                                                           label={"Артикул"}/>
                                                <FormInput name={`variants.${newIndex}.crmId`} control={methods.control}
                                                           label={"CRM ID"}/>
                                                <FormSelect
                                                    className={'max-w-[300px]'}
                                                    name={`variants.${newIndex}.availability`}
                                                    control={methods.control}
                                                    label={'Наличие'}
                                                    defaultValue={variants?.[newIndex].availability || 'IN_STOCK'}
                                                    placeholder={'Наличие'}
                                                    options={availabilityOptions}
                                                />


                                                <FormImageCustom name={`variants.${newIndex}.image.url`}
                                                            control={methods.control}
                                                            label={'Фото'}
                                                            siteEntity={"Image"}
                                                            siteEntityField={"url"}
                                                            siteEntityId={"new"}
                                                            compressionType={"light"}
                                                 />

                                            </List>
                                        </FormCard>

                                    )
                                }
                            )}
                            <div className={'grid place-items-center'}>
                                <IconButton
                                    onClick={() => createVariant({
                                        title: '',
                                        sku: '',
                                        subtitle: '',
                                        availability: 'IN_STOCK',
                                        price: 1500,
                                        image: {
                                            url: '',
                                            name: '',
                                        },
                                        crmId: '',
                                        oldPrice: undefined
                                    })}
                                    icon={<LuPlus className={'text-sm'}/>}
                                >
                                    Добавить вариацию
                                </IconButton>
                            </div>
                        </div>
                    </FormCard>

                    <FormCard>
                        <Title icon={<GrNotes className={'text-lg'}/>} className={'mb-6'}>Характеристики</Title>
                        <List>
                            {specs?.map((spec, index) =>
                                <FormCard key={spec.formId}>
                                    <Title className={'mb-4'}>
                                        <div className={'flex justify-between items-center w-full'}>
                                            <div>{methods.watch(`specs.${index}.title`) || 'Характеристика ' + (index + 1)}</div>
                                            <Button
                                                variant={'ghost'}
                                                onClick={() => deleteSpec(index)}>
                                                <LuTrash className={'text-lg'}/>
                                            </Button>
                                        </div>
                                    </Title>
                                    <div className={'grid grid-cols-1 md:grid-cols-2 gap-8'}>
                                        <FormInput name={`specs.${index}.title`} control={methods.control}
                                                   label={'Характеристика'}/>
                                        <FormTextarea name={`specs.${index}.value`} control={methods.control}
                                                      label={'Значение'}/>
                                    </div>

                                </FormCard>
                            )}
                            <IconButton
                                className={"self-start"}
                                onClick={() => createSpec({
                                    title: '',
                                    value: '',
                                })}
                                icon={<LuPlus className={'text-sm'}/>}
                            >
                                Добавить характеристику
                            </IconButton>

                        </List>

                    </FormCard>


                    <FormCard>
                        <Title icon={<GrNotes className={'text-lg'}/>} className={'mb-6'}>Вопрос/Ответ</Title>
                        <List>
                            {questions?.map((question, index) =>
                                <FormCard key={question.formId}>
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
                    {isUpdate &&
                        <FormCard>
                            <Title icon={<GrNotes className={'text-lg'}/>} className={'mb-6'}>Лендинг</Title>

                            {
                                landing ?
                                    <>
                                        <div className={'mb-6'}>
                                            <List>
                                                <FormCard
                                                    className={'grid gap-5 grid-cols-1 md:grid-cols-2'}
                                                >
                                                    <List>
                                                        <div>
                                                            <Button onClick={() => {
                                                                methods.setValue('landing.isVideo', !landing.isVideo)
                                                                methods.setValue('landing.image1', '')
                                                            }}>
                                                                {landing.isVideo ? 'Видео' : 'Фото'}
                                                            </Button>
                                                        </div>

                                                        {landing.isVideo ?
                                                            <>
                                                                <FormVideoCustom name={'landing.image1'}
                                                                           control={methods.control}
                                                                           label={'Видео'}
                                                                           siteEntity={"Landing"}
                                                                           siteEntityField={"image1"}
                                                                           siteEntityId={"new"}
                                                                />
                                                                {
                                                                    landing.image1 !== video &&
                                                                    <Button
                                                                        size={'sm'}
                                                                        className={'self-start'}
                                                                        disabled={!video}
                                                                        onClick={() => methods.setValue('landing.image1', video as string)}
                                                                    >
                                                                        Скопировать с основного
                                                                    </Button>
                                                                }
                                                            </>
                                                            :
                                                             <FormImageCustom name={"landing.image1"}
                                                                        control={methods.control}
                                                                        label={'Фото'}
                                                                        siteEntity={"Landing"}
                                                                        siteEntityField={"image1"}
                                                                        siteEntityId={"new"}
                                                                        compressionType={"light"}
                                                             />
                                                        }
                                                    </List>
                                                    <List>
                                                        <FormInput
                                                            name={`landing.title`}
                                                            control={methods.control}
                                                            label={'Заголовок'}
                                                        />
                                                        <FormTextarea
                                                            name={`landing.subtitle`}
                                                            control={methods.control}
                                                            label={'Подзаголовок'}
                                                        />
                                                        <FormInput
                                                            name={`landing.featureItem_1`}
                                                            control={methods.control}
                                                            label={'Преимущество 1'}
                                                        />
                                                        <FormInput
                                                            name={`landing.featureItem_2`}
                                                            control={methods.control}
                                                            label={'Преимущество 2'}
                                                        />
                                                        <FormInput
                                                            name={`landing.featureItem_3`}
                                                            control={methods.control}
                                                            label={'Преимущество 3'}
                                                        />
                                                    </List>
                                                </FormCard>


                                                <div className={'grid gap-5 grid-cols-1 md:grid-cols-2'}>
                                                    <FormCard>
                                                        <List>
                                                            <List>
                                                                <FormInput
                                                                    name={`landing.description_title_1`}
                                                                    control={methods.control}
                                                                    label={'Заголовок 1'}
                                                                />
                                                                <FormTextarea
                                                                    name={`landing.description_text_1`}
                                                                    control={methods.control}
                                                                    label={'Текст 1'}
                                                                />
                                                            </List>

                                                            <List>
                                                                <FormInput
                                                                    name={`landing.description_title_2`}
                                                                    control={methods.control}
                                                                    label={'Заголовок 2'}
                                                                />
                                                                <FormTextarea
                                                                    name={`landing.description_text_2`}
                                                                    control={methods.control}
                                                                    label={'Текст 2'}
                                                                />
                                                            </List>

                                                            <List>
                                                                <FormInput
                                                                    name={`landing.description_title_3`}
                                                                    control={methods.control}
                                                                    label={'Заголовок 3'}
                                                                />
                                                                <FormTextarea
                                                                    name={`landing.description_text_3`}
                                                                    control={methods.control}
                                                                    label={'Текст 3'}
                                                                />
                                                            </List>
                                                        </List>
                                                    </FormCard>
                                                    <FormCard>
                                                        <FormImageCustom name={"landing.image2"}
                                                                   control={methods.control}
                                                                   label={'Второе фото'}
                                                                   siteEntity={"Landing"}
                                                                   siteEntityField={"image2"}
                                                                   siteEntityId={"new"}
                                                                   compressionType={"light"}
                                                        />
                                                    </FormCard>
                                                </div>

                                                <FormCard
                                                    className={'grid gap-5 grid-cols-1 md:grid-cols-2'}
                                                >
                                                    <FormCard>
                                                        <FormPickPhoto
                                                            name={'landing.image3'}
                                                            control={methods.control}
                                                            label={'Фото отзыва'}
                                                            defaultValue={product?.landing?.image3}
                                                            photos={reviewImages}
                                                        />
                                                    </FormCard>
                                                    <FormCard>
                                                        <FormPickReview
                                                            name={'landing.reviewId'}
                                                            control={methods.control}
                                                            label={'Отзыв'}
                                                            reviews={product.reviews}
                                                            onChangeTrigger={() => methods.setValue('landing.image3', '')}
                                                        />
                                                    </FormCard>
                                                    {methods.watch('landing.reviewId') &&
                                                        <div>
                                                            <Button onClick={() => {
                                                                methods.setValue('landing.reviewId', '')
                                                                methods.setValue('landing.image3', '')
                                                            }}>
                                                                Очистить блок
                                                            </Button>
                                                        </div>
                                                    }


                                                </FormCard>

                                                <FormSwitch name={'landing.block_4'} control={methods.control} label={'Блок 4'}
                                                            description={'Статус блока 4 для лендинга'}/>
                                                {landing.block_4 &&
                                                <FormCard
                                                    className={'grid gap-5 grid-cols-1 md:grid-cols-2'}
                                                >

                                                    <List>
                                                        <div>
                                                            <Button onClick={() => {
                                                                methods.setValue('landing.isVideo4', !landing.isVideo4)
                                                                methods.setValue('landing.image4', '')
                                                            }}>
                                                                {landing.isVideo4 ? 'Видео' : 'Фото'}
                                                            </Button>
                                                        </div>

                                                        {landing.isVideo4 ?
                                                            <>
                                                                <FormVideoCustom name={'landing.image4'}
                                                                           control={methods.control}
                                                                           label={'Видео'}
                                                                           siteEntity={"Landing"}
                                                                           siteEntityField={"image4"}
                                                                           siteEntityId={"new"}
                                                                />
                                                                {
                                                                    landing.image4 !== video &&
                                                                    <Button
                                                                        size={'sm'}
                                                                        className={'self-start'}
                                                                        disabled={!video}
                                                                        onClick={() => methods.setValue('landing.image4', video as string)}
                                                                    >
                                                                        Скопировать с основного
                                                                    </Button>
                                                                }
                                                            </>
                                                            :
                                                             <FormImageCustom name={"landing.image4"}
                                                                        control={methods.control}
                                                                        label={'Фото'}
                                                                        siteEntity={"Landing"}
                                                                        siteEntityField={"image4"}
                                                                        siteEntityId={"new"}
                                                                        compressionType={"light"}
                                                             />
                                                        }
                                                    </List>
                                                    <List>
                                                        <FormInput
                                                            name={`landing.title_4`}
                                                            control={methods.control}
                                                            label={'Заголовок'}
                                                        />
                                                        <FormTextarea
                                                            name={`landing.subtitle_4`}
                                                            control={methods.control}
                                                            label={'Подзаголовок'}
                                                        />
                                                        <FormInput
                                                            name={`landing.featureItem_4_1`}
                                                            control={methods.control}
                                                            label={'Преимущество 1'}
                                                        />
                                                        <FormInput
                                                            name={`landing.featureItem_4_2`}
                                                            control={methods.control}
                                                            label={'Преимущество 2'}
                                                        />
                                                        <FormInput
                                                            name={`landing.featureItem_4_3`}
                                                            control={methods.control}
                                                            label={'Преимущество 3'}
                                                        />
                                                    </List>
                                                </FormCard>
                                                }

                                            </List>
                                        </div>

                                        <IconButton
                                            className={"self-start"}
                                            onClick={() => methods.setValue('landing', undefined)}
                                            icon={<LuTrash className={'text-sm'}/>}
                                        >
                                            Удалить лендинг
                                        </IconButton>
                                    </>

                                    : <IconButton
                                        className={"self-start"}
                                        onClick={() => methods.setValue('landing', {
                                            title: '',
                                            subtitle: '',
                                            reviewId: undefined,
                                            isVideo: false,
                                            featureItem_1: '',
                                            featureItem_2: '',
                                            featureItem_3: '',
                                            description_title_1: '',
                                            description_text_1: '',
                                            description_title_2: '',
                                            description_text_2: '',
                                            description_title_3: '',
                                            description_text_3: '',
                                            image1: '',
                                            image2: '',
                                            image3: '',
                                            image4: '',
                                            isVideo4: false,
                                            block_4: false,
                                            title_4: '',
                                            subtitle_4: '',
                                            featureItem_4_1: '',
                                            featureItem_4_2: '',
                                            featureItem_4_3: '',
                                        })}
                                        icon={<LuPlus className={'text-sm'}/>}
                                    >
                                        Добавить лендинг
                                    </IconButton>
                            }
                        </FormCard>
                    }


                </List>


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

export default ProductForm;
