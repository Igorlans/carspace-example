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
import PickReview from "@/app/(admin)/adminpanel/products/_components/PickReview";
import {FullProduct} from "@/types/product";

interface IFormInputProps<T extends FieldValues> {
    name: Path<T>;
    control: Control<T>;
    label: string;
    description?: string;
    reviews: FullProduct['reviews'];
    shouldUnregister?: boolean;
    defaultValue?: PathValue<T, Path<T>>;
    onChangeTrigger?: (newValue: string) => void;
}
const FormPickReview = <T extends FieldValues>({
                                              name,
                                              control,
                                              label,
                                              defaultValue,
                                              shouldUnregister = false,
                                              description,
    reviews,
                                              onChangeTrigger,
                                          }: IFormInputProps<T>) => {
    return (
        <FormField
            control={control}
            name={name}
            defaultValue={defaultValue}
            shouldUnregister={shouldUnregister}
            render={({ field: {onChange, ...field} }) => (
                <FormItem className={'flex flex-col gap-5'}>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <PickReview
                            value={field.value}
                            setValue={(newValue) => {
                                onChange(newValue)
                                onChangeTrigger && onChangeTrigger(newValue)
                            }}
                            reviews={reviews}
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

export default FormPickReview;