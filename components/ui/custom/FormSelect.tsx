import React, {useEffect, useState} from 'react';
import {Control, FieldValues, Path, PathValue} from "react-hook-form";
import {
    Select,
    SelectContent, SelectGroup,
    SelectItem, SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import {FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Separator} from "@/components/ui/separator";
import {cn} from "@/lib/utils";

interface IFormSelectProps<T extends FieldValues> {
    name: Path<T>;
    control: Control<T>;
    label: string;
    placeholder: string;
    description?: string;
    className?: string;
    shouldUnregister?: boolean;
    onChangeTrigger?: (newValue: PathValue<T, Path<T>>) => void;
    defaultValue?: PathValue<T, Path<T>>;
    options: SelectItem[];
}

export type SelectItem = {
    label: string | React.ReactNode;
    value: string;
} | {
    label: 'separator',
    value: 'separator',
}
const FormSelect = <T extends FieldValues>({
    name, control, label, shouldUnregister = false, description, defaultValue, options, placeholder, onChangeTrigger, className
                                           }: IFormSelectProps<T>) => {

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);


    if (!isMounted) {
        return null;
    }

    return (
            <FormField
                control={control}
                name={name}
                defaultValue={defaultValue}
                shouldUnregister={shouldUnregister}
                render={({field}) => (
                    <FormItem
                        className={cn(className)}
                    >
                        <FormLabel>{label}</FormLabel>
                        <Select
                            onValueChange={(value) => {
                                field.onChange(value as PathValue<T, Path<T>>)
                                onChangeTrigger && onChangeTrigger(value as PathValue<T, Path<T>>)
                            }}
                            defaultValue={field.value}
                        >
                            <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder={placeholder} />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>{label}</SelectLabel>
                                    {options?.map((option, index) => {
                                        if (option.value === 'separator' && option.label === 'separator') {
                                            return (
                                                <Separator key={index} />
                                            )
                                        } else {
                                            return (
                                                <SelectItem key={index} value={option.value}>{option.label}</SelectItem>
                                            )
                                        }
                                    }

                                    )}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        {description &&
                            <FormDescription>
                                {description}
                            </FormDescription>
                        }
                        <FormMessage />
                    </FormItem>
                )}
            />
    );
};

export default FormSelect;