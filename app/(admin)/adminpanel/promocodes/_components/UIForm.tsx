import { FC } from 'react'
import { UseFormReturn } from 'react-hook-form'
import type { PromocodeSchemaValue } from '@/types/order'
import { $Enums } from '@prisma/client'

import { Form } from '@/components/ui/form'
import FormSelect from '@/components/ui/custom/FormSelect'
import FormInput from '@/components/ui/custom/FormInput'
import FormSwitch from '@/components/ui/custom/FormSwitch'

interface UIFormProps {
    form : UseFormReturn<PromocodeSchemaValue>
}

const UIForm: FC<UIFormProps> = ({ form }) => {
    return (
        <Form {...form}>
            <div className='flex flex-col gap-y-6'>
                <FormSelect
                    name="type"
                    control={form.control}
                    label="Тип промокоду"
                    placeholder={'Виберіть тип товару'}
                    options={[
                        {label: "Фіксований", value: $Enums.PromocodeType.FIXED},
                        {label: "Відсотковий", value: $Enums.PromocodeType.PERCENT},
                    ]}
                />
                <div className='flex flex-col gap-y-4'>
                    <FormInput 
                        name="code"
                        control={form.control}
                        label="Промокод"
                    />
                    <FormSwitch 
                        name="isActive"
                        control={form.control}
                        label={form.getValues("isActive") ? "Промокод действительный" : "Промокод недействительный"}
                    />
                </div>
                <FormInput 
                    name="value"
                    control={form.control}
                    label={`Размер скидки ${form.getValues("type") === "FIXED" ? "(сум.)" : "(%)"}`}
                />
            </div>
        </Form>
    )
}

export default UIForm