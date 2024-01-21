import React, {HTMLAttributes, HTMLInputTypeAttribute} from 'react';
import {
    FormControl, 
    FormDescription, 
    FormField, 
    FormItem, 
    FormLabel, 
    FormMessage
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {
    Control, 
    FieldValues, 
    Path, 
    PathValue
} from "react-hook-form";
import {cn} from "@/lib/utils";
import Rating from '@/components/rating/Rating';

interface IFormRatingProps<T extends FieldValues> {
    name: Path<T>;
    control: Control<T>;
    label: string;
    placeholder?: string;
    description?: string;
    variant?: "display" | "active" | "product"
    className?: HTMLAttributes<'div'>["className"];
    type?: HTMLInputTypeAttribute;
    shouldUnregister?: boolean;
    defaultValue?: PathValue<T, Path<T>>;
    disabled?: boolean;
    multiline?: boolean;
    rows?: number;
    onChangeTrigger?: (newValue: string) => void;
}
const FormRating = <T extends FieldValues>({
    name,
    control,
    label,
    defaultValue,
    variant,
    shouldUnregister = false,
    type = 'text',
    placeholder,
    description,
    disabled,
    className,
    onChangeTrigger,
}: IFormRatingProps<T>) => {
    return (
        <FormField
            control={control}
            name={name}
            defaultValue={defaultValue}
            shouldUnregister={shouldUnregister}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <Rating
                            type={variant}
                            rating={field.value}
                            onChange={(rating) => field.onChange(rating)}
                        />
                    </FormControl>
                    {
                        description &&
                        <FormDescription>{description}</FormDescription>
                    }
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default FormRating;