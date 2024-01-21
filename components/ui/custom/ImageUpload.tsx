"use client";
import { CldUploadWidget } from 'next-cloudinary';
import React, {useEffect, useRef, useState} from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { ImagePlus, Trash } from 'lucide-react';

interface ImageUploadProps {
    disabled?: boolean;
    aspectRatio?: number;
    onChange: (value: string) => void;
    onRemove: (value: string) => void;
    value: string[];
    showSkipCropButton?: boolean;
    multiple?: boolean;
    cropping?: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
                                                     disabled,
                                                     onChange,
                                                     onRemove,
                                                     value,
                                                     aspectRatio = 1,
                                                     showSkipCropButton = false,
                                                     multiple = false,
                                                     cropping = true,
                                                 }) => {
    const [isMounted, setIsMounted] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null)


    useEffect(() => {
        setIsMounted(true);
    }, []);

    const onUpload = (result: any) => {
        console.log('RESULT', result)
        onChange(result.info.secure_url);
    };


    if (!isMounted) {
        return null;
    }

    const maxFiles = multiple ? 3 : 1;
    // console.log('Multiple', multiple);
    // console.log('Max files', maxFiles);

    return (
        <div>
            <div className="mb-4 flex items-center gap-4">
                {value.map((url) => (
                    <div key={url} className="relative w-[200px] h-[200px] rounded-md overflow-hidden">
                        <div className="z-10 absolute top-2 right-2">
                            <Button type="button" onClick={() => onRemove(url)} variant="destructive" size="sm">
                                <Trash className="h-4 w-4" />
                            </Button>
                        </div>
                        <Image
                            fill
                            sizes={'50vw'}
                            className="object-cover"
                            alt="Image"
                            src={url}
                        />
                    </div>
                ))}
            </div>
            <div id={'widgetContainer'} style={{pointerEvents: 'all'}}>
                <CldUploadWidget options={{
                    cropping: cropping,
                    showSkipCropButton: showSkipCropButton,
                    croppingCoordinatesMode: 'custom',
                    croppingAspectRatio: aspectRatio,
                    showAdvancedOptions: true,
                    multiple: multiple,
                    maxFiles: maxFiles,
                    resourceType: 'image'
                }} onUpload={onUpload} uploadPreset="wfgpkcvd">
                    {({ open, results,  }) => {
                        const onClick = (event: any) => {
                            event.preventDefault()
                            open();
                        };

                        if (value.length) return <div></div>

                        return (
                            <Button
                                type="button"
                                disabled={disabled}
                                variant="secondary"
                                onClick={onClick}
                            >
                                <ImagePlus className="h-4 w-4 mr-2" />
                                Загрузить фото
                            </Button>
                        );
                    }}
                </CldUploadWidget>
            </div>

        </div>
    );
}

export default ImageUpload;
