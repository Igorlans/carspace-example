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
import {Checkbox} from "@/components/ui/checkbox";

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

const FormCheckbox = <T extends FieldValues>({
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
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={(checked) => {
                    onChange(checked)
                    onChangeTrigger && onChangeTrigger(checked as boolean)
                }}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  {
                    label
                  }
                </FormLabel>
                <FormDescription>
                  {
                    description
                  }
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
    );
};

export default FormCheckbox;

