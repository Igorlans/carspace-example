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
import PickPhoto from "@/components/ui/custom/PickPhoto";
import {useEffect} from "react";

interface IFormInputProps<T extends FieldValues> {
    name: Path<T>;
    control: Control<T>;
    label: string;
    description?: string;
    photos: string[] | undefined;
    shouldUnregister?: boolean;
    defaultValue?: PathValue<T, Path<T>>;
    onChangeTrigger?: (newValue: string) => void;
}

const FormPickPhoto = <T extends FieldValues>({
                                                  name,
                                                  control,
                                                  label,
                                                  defaultValue,
                                                  shouldUnregister = false,
                                                  description,
                                                  photos,
                                                  onChangeTrigger,
                                              }: IFormInputProps<T>) => {


    return (
        <FormField
            control={control}
            name={name}
            defaultValue={defaultValue}
            shouldUnregister={shouldUnregister}
            render={({field: {onChange, ...field}}) => {

                return (
                    <FormItem className={'flex flex-col gap-5'}>
                        <FormLabel>{label}</FormLabel>
                        <FormControl>
                            <PickPhoto
                                value={field.value}
                                setValue={(newValue) => {
                                    onChange(newValue)
                                    onChangeTrigger && onChangeTrigger(newValue)
                                }}
                                photos={photos}
                            />
                        </FormControl>
                        {
                            description &&
                            <FormDescription>{description}</FormDescription>
                        }
                        <FormMessage/>
                    </FormItem>
                )

            }}
        />
    );
};

export default FormPickPhoto;