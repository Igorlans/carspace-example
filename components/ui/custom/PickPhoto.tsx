import {FC, useEffect} from "react";
import {cn} from "@/lib/utils";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {PhotoProvider, PhotoView} from "react-photo-view";
import 'react-photo-view/dist/react-photo-view.css';
import {Label} from "@/components/ui/label";
import List from "@/app/(admin)/adminpanel/components/List";

interface IPickPhotoProps {
    value: string;
    setValue: (newValue: string) => void;
    photos: string[] | undefined;
    className?: string;
    aspectRatio?: number;
}

const PickPhoto: FC<IPickPhotoProps> = ({value, setValue, photos, className, aspectRatio = 1}) => {

    console.log('photosss', photos)

    return (
        <div className={cn('', className)}>
            <PhotoProvider>
                <List>
                    {photos?.length ? photos?.map((photo, index) =>
                        <div>
                            <label className={'flex items-center gap-5'}>
                                <input
                                    className={'cursor-pointer'}
                                    type="radio"
                                    value={photo}
                                    checked={value === photo}
                                    onChange={(e) => setValue(e.target.value)}
                                />
                                <PhotoView key={index} src={photo}>
                                    <div className={`relative aspect-[${aspectRatio}] w-20`}>
                                        <img className={'object-cover rounded'} src={photo} alt={`Фото ${index + 1}`}/>
                                    </div>
                                </PhotoView>
                            </label>
                        </div>
                    )
                    : <div>У отзыва нету фото</div>
                    }
                </List>
            </PhotoProvider>
        </div>
    );
};

export default PickPhoto;