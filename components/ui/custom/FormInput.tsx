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

interface IFormInputProps<T extends FieldValues> {
    name: Path<T>;
    control: Control<T>;
    label: string;
    placeholder?: string;
    description?: string;
    className?: HTMLAttributes<'div'>["className"];
    type?: HTMLInputTypeAttribute;
    shouldUnregister?: boolean;
    defaultValue?: PathValue<T, Path<T>>;
    disabled?: boolean;
    multiline?: boolean;
    rows?: number;
    onChangeTrigger?: (newValue: string) => void;
}
const FormInput = <T extends FieldValues>({
    name,
    control,
    label,
    defaultValue,
    shouldUnregister = false,
    type = 'text',
    placeholder,
    description,
    disabled,
    className,
    onChangeTrigger,
}: IFormInputProps<T>) => {
    return (
        <FormField
            control={control}
            name={name}
            defaultValue={defaultValue}
            shouldUnregister={shouldUnregister}
            render={({ field: {onChange, ...field} }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <Input
                            className={cn('focus-visible:ring-blue-300', className)}
                            type={type}
                            onChange={(e) => {
                                const newValue = e.target.value;
                                onChange(e);
                                onChangeTrigger && onChangeTrigger(newValue);
                            }}
                            disabled={disabled || false}
                            placeholder={placeholder}
                            {...field}
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

export default FormInput;