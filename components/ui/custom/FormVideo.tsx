'use client'

import {Control, FieldPathValue, FieldValues, Path, PathValue} from "react-hook-form";
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import ImageUpload from "@/components/ui/custom/ImageUpload";
import VideoUpload from "@/components/ui/custom/VideoUpload";

interface IFormImageProps<T extends FieldValues> {
    name: Path<T>;
    control: Control<T>;
    label: string | React.ReactNode;
    shouldUnregister?: boolean;
    defaultValue?: PathValue<T, Path<T>>;
    disabled?: boolean;
    onChangeTrigger?: (newValue: string) => void;
    onDelete?: () => void;
}

const FormImage = <T extends FieldValues>({
                                              name,
                                              control,
                                              label,
                                              disabled,
                                              defaultValue,
                                              onChangeTrigger,
                                              onDelete
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
                        <VideoUpload
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
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default FormImage;