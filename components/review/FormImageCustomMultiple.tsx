'use client'

import {Control, FieldPathValue, FieldValues, Path, PathValue} from "react-hook-form";
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import ImageUploadCustom from "@/components/ui/custom/media-hosting/ImageUploadCustom";

interface IFormImageCustomMultipleProps<T extends FieldValues> {
    name: Path<T>;
    control: Control<T>;
    aspectRatio?: number;
    label: string | React.ReactNode;
    shouldUnregister?: boolean;
    defaultValue?: PathValue<T, Path<T>>;
    disabled?: boolean;
    onChangeTrigger?: (newValue: string) => void;
    onDelete?: () => void;
    onOpen?: () => void;
    showSkipCropButton?: boolean;
    multiple?: boolean;
    cropping?: boolean;
    updateFiles?: (url: string) => void;
}

const FormImageCustomMultiple = <T extends FieldValues>({
    name,
    control,
    aspectRatio,
    label,
    disabled,
    defaultValue,
    onChangeTrigger,
    onDelete,
    onOpen,
    showSkipCropButton = false,
    multiple = false,
    cropping = true,
    updateFiles = (url) => {return}
}: IFormImageCustomMultipleProps<T>) => {
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
                                // field.onChange(url as FieldPathValue<FieldValues, string>)
                                // onChangeTrigger && onChangeTrigger(url)
                                updateFiles(url)

                            }}
                            onRemove={() => {
                                field.onChange('' as FieldPathValue<FieldValues, string>)
                                onDelete && onDelete()
                            }}
                            multiple={multiple}
                            siteEntity={"Review"}
                            siteEntityField={"file"}
                            siteEntityId={"new"}
                            compressionType={"normal"}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default FormImageCustomMultiple;
