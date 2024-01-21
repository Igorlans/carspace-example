import {Control, FieldValues, Path, PathValue} from "react-hook-form";
import {FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Textarea} from "@/components/ui/textarea";
import {cn} from "@/lib/utils";

interface IFormTextareaProps<T extends FieldValues> {
    name: Path<T>;
    control: Control<T>;
    label: string;
    placeholder?: string;
    description?: string;
    shouldUnregister?: boolean;
    defaultValue?: PathValue<T, Path<T>>;
    disabled?: boolean;
    className?: string;
    onChangeTrigger?: (newValue: string) => void;
}

const FormTextarea = <T extends FieldValues>({
    name, control, label, placeholder, description, shouldUnregister, defaultValue, disabled,onChangeTrigger, className
                                             }: IFormTextareaProps<T>) => {
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
                        <Textarea
                            className={cn('focus-visible:ring-blue-300', className)}
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

export default FormTextarea;