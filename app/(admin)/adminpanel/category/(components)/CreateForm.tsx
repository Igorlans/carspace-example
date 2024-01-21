import { FC } from 'react'

import { Form } from '@/components/ui/form'
import { UseFormReturn } from 'react-hook-form'
import type { ICategorySchema } from '../formSchema'
import FormInput from '@/components/ui/custom/FormInput'
import FormImage from '@/components/ui/custom/FormImage'
import FormImageCustom from '@/components/ui/custom/media-hosting/FormImageCustom'

interface CreateFormProps {
  form: UseFormReturn<ICategorySchema>
}

const CreateForm: FC<CreateFormProps> = ({ form }) => {
  return (
    <Form {...form}>
        <form className="flex flex-col gap-y-4">
            <FormInput
                name="title"
                control={form.control}
                label="Название RUS"
            />
            <FormInput
                name="title_uz"
                control={form.control}
                label="Название UZ"
            />
            {/*<FormImage
              name='banner'
              control={form.control}
              label="Банер категории"
              aspectRatio={16/4}
            />*/}
            <FormImageCustom name={"banner"}
                       control={form.control}
                       label={'Банер категории'}
                       siteEntity={"Category"}
                       siteEntityField={"Banner"}
                       siteEntityId={"new"}
                       compressionType={"light"}
            />
        </form>
    </Form>
  )
}

export default CreateForm
