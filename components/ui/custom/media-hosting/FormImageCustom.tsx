'use client'

import {Control, FieldPathValue, FieldValues, Path, PathValue} from "react-hook-form";
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import ImageUploadCustom from "@/components/ui/custom/media-hosting/ImageUploadCustom";

interface IFormImageCustomProps<T extends FieldValues> {
    name: Path<T>;
    control: Control<T>;
    label: string | React.ReactNode;
    shouldUnregister?: boolean;
    defaultValue?: PathValue<T, Path<T>>;
    disabled?: boolean;
    onChangeTrigger?: (newValue: string) => void;
    onDelete?: () => void;
    onOpen?: () => void;
    multiple?: boolean;
    siteEntity?: string;
    siteEntityField?: string;
    siteEntityId?: string;
    compressionType?: string;
    hidden?: boolean;
    isOpened?: boolean;
    customOnClick?: () => void;
}

const FormImageCustom = <T extends FieldValues>({
    name,
    control,
    label,
    disabled,
    defaultValue,
    onChangeTrigger,
    onDelete,
    onOpen,
    multiple = false,
    siteEntity = 'Image',
    siteEntityField = 'url',
    siteEntityId = 'new',
    compressionType = 'light',
}: IFormImageCustomProps<T>) => {
    return (
        <FormField
            control={control}
            name={name}
            defaultValue={defaultValue}
            render={({ field }) => (
                <FormItem className={'space-y-0 flex flex-col gap-2'}>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <ImageUploadCustom
                            value={field.value ? [field.value] : []}
                            disabled={disabled}
                            onChange={(url) => {
                                field.onChange(url as FieldPathValue<FieldValues, string>)
                                onChangeTrigger && onChangeTrigger(url)
                            }}
                            onRemove={() => {
                                field.onChange('' as FieldPathValue<FieldValues, string>)
                                onDelete && onDelete()
                            }}
                            multiple={multiple}
                            siteEntity={siteEntity}
                            siteEntityField={siteEntityField}
                            siteEntityId={siteEntityId}
                            compressionType={compressionType}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default FormImageCustom;
