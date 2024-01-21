import React, {HTMLAttributes} from 'react';
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import {
    Control,
    FieldValues,
    Path,
    PathValue
} from "react-hook-form";
import {cn} from "@/lib/utils";
import {Switch} from "@/components/ui/switch";

interface IFormInputProps<T extends FieldValues> {
    name: Path<T>;
    control: Control<T>;
    label: string;
    placeholder?: string;
    description?: string;
    className?: HTMLAttributes<'div'>["className"];
    shouldUnregister?: boolean;
    defaultValue?: PathValue<T, Path<T>>;
    disabled?: boolean;
    onChangeTrigger?: (newValue: boolean) => void;
}

const FormInput = <T extends FieldValues>({
                                              name,
                                              control,
                                              label,
                                              defaultValue,
                                              shouldUnregister = false,
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
            render={({field: {onChange, ...field}}) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border border-blue-200 p-4">
                    <div className="space-y-0.5">
                        <FormLabel className="text-base">
                            {label}
                        </FormLabel>
                        {description &&
                            <FormDescription>
                                {description}
                            </FormDescription>
                        }
                    </div>
                    <FormControl>
                        <Switch
                            disabled={disabled}
                            checked={field.value}
                            onCheckedChange={(checked) => {
                                onChange(checked)
                                onChangeTrigger && onChangeTrigger(checked)
                            }}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default FormInput;