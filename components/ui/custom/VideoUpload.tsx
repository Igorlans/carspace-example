"use client";
import {CldUploadWidget, CldVideoPlayer} from 'next-cloudinary';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';
import {LuFileVideo2} from "react-icons/lu";
import 'next-cloudinary/dist/cld-video-player.css';

interface ImageUploadProps {
    disabled?: boolean;
    onChange: (value: string) => void;
    onRemove: (value: string) => void;
    value: string[];
}

const VideoUpload: React.FC<ImageUploadProps> = ({
                                                     disabled,
                                                     onChange,
                                                     onRemove,
                                                     value
                                                 }) => {
    const [isMounted, setIsMounted] = useState(false);

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
                        <CldVideoPlayer
                            width={200}
                            height={200}
                            src={url}
                        />
                    </div>
                ))}
            </div>
            <CldUploadWidget onUpload={onUpload} options={{
                multiple: false,
                resourceType: 'video'
            }}>
                {({ open, results }) => {
                    const onClick = () => {
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
                            <LuFileVideo2 className="h-4 w-4 mr-2" />
                            Загрузить видео
                        </Button>
                    );
                }}
            </CldUploadWidget>
        </div>
    );
}

export default VideoUpload;