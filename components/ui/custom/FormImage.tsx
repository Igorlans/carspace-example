'use client'

import {Control, FieldPathValue, FieldValues, Path, PathValue} from "react-hook-form";
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import ImageUpload from "@/components/ui/custom/ImageUpload";

interface IFormImageProps<T extends FieldValues> {
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
}

const FormImage = <T extends FieldValues>({
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
}: IFormImageProps<T>) => {
    return (
        <FormField
            control={control}
            name={name}
            defaultValue={defaultValue}
            render={({ field }) => (
                <FormItem className={'space-y-0 flex flex-col gap-2'}>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <ImageUpload
                            value={field.value ? [field.value] : []}
                            disabled={disabled}
                            aspectRatio={aspectRatio}
                            onChange={(url) => {
                                field.onChange(url as FieldPathValue<FieldValues, string>)
                                onChangeTrigger && onChangeTrigger(url)
                            }}
                            onRemove={() => {
                                field.onChange('' as FieldPathValue<FieldValues, string>)
                                onDelete && onDelete()
                            }}
                            showSkipCropButton={showSkipCropButton}
                            multiple={multiple}
                            cropping={cropping}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default FormImage;
