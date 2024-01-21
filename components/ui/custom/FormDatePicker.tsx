import React from 'react';
import {Control, FieldValues, Path, PathValue} from "react-hook-form";
import {FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import {uk} from "date-fns/locale";
import {CalendarIcon} from "lucide-react";
import {Calendar} from "@/components/ui/calendar";
import dayjs from "dayjs";

interface IFormDatePickerProps<T extends FieldValues> {
    name: Path<T>;
    control: Control<T>;
    label: string;
    description?: string;
    shouldUnregister?: boolean;
    defaultValue?: PathValue<T, Path<T>>;
    disabled?: boolean;
    onChangeTrigger?: (newValue: string) => void;
}

const FormDatePicker = <T extends FieldValues>({
    name,
    control,
    label,
    description,
    shouldUnregister = false,
    defaultValue,
    disabled,
    onChangeTrigger
                                               }: IFormDatePickerProps<T>) => {
    return (
        <FormField
            control={control}
            name={name}
            defaultValue={defaultValue}
            render={({ field }) => (
                <FormItem className="flex flex-col">
                    <FormLabel>{label}</FormLabel>
                    <Popover>
                        <PopoverTrigger asChild>
                            <FormControl>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-[240px] pl-3 text-left font-normal",
                                        !field.value && "text-muted-foreground"
                                    )}
                                >
                                    {field.value ? (
                                        dayjs(field.value).format('DD.MM.YYYY')
                                    ) : (
                                        <span>Виберіть дату</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                            </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                locale={uk}
                                mode="single"
                                selected={field.value}
                                onSelect={(newDate) => field.onChange(newDate as PathValue<T, Path<T>>)}
                                disabled={(date) =>
                                    date <= new Date() || date < new Date("1900-01-01")
                                }
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                    {
                        description &&
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

export default FormDatePicker;