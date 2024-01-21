"use client";
import React, {useEffect, useRef, useState} from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { ImagePlus, Trash } from 'lucide-react';
import Uploader from '@/components/ui/custom/media-hosting/Uploader';
// import { t } from '@/utils/media-hosting/translations';
import { createPortal } from 'react-dom';

import messages from '@/messages/ru.json';
import {useTranslations} from 'use-intl';
import {createTranslator} from 'next-intl';


interface ImageUploadCustomProps {
    disabled?: boolean;
    onChange: (value: string) => void;
    onRemove: (value: string) => void;
    value: string[];
    multiple?: boolean;
    siteEntity?: string;
    siteEntityField?: string;
    siteEntityId?: string;
    compressionType?: string;
}

const ImageUploadCustom: React.FC<ImageUploadCustomProps> = ({
                                                     disabled,
                                                     onChange,
                                                     onRemove,
                                                     value,
                                                     multiple = false,
                                                     siteEntity = 'Image',
                                                     siteEntityField = 'url',
                                                     siteEntityId = 'new',
                                                     compressionType = 'light'
                                                 }) => {

    const [isMounted, setIsMounted] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null)
    const [modalOpened, setModalOpened] = useState(false);

    var t: any = (tr: string) => {return tr;};
    try {
      t = useTranslations("mediaHosting");
    } catch (error) {
      // console.log('Messages', messages);
      t = createTranslator({locale: 'ru', namespace: 'mediaHosting', messages: messages});
    }

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const onUpload = (result: any) => {
        console.log('RESULT', result)
        onChange(result.url);
    };


    if (!isMounted) {
        return null;
    }

    const maxFiles = multiple ? 3 : 1;
    // console.log('Multiple', multiple);
    // console.log('Max files', maxFiles);

    const onClick = (e: any) => {
      e.preventDefault();

      setModalOpened(true);
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
              { value.length === 0 &&
                <Button
                    type="button"
                    disabled={disabled}
                    variant="secondary"
                    onClick={onClick}
                >
                    <ImagePlus className="h-4 w-4 mr-2" />
                    {t('buttonUploadImage')}
                </Button>
              }
            </div>
            {createPortal(
              <div
                className="custom-media-hosting-uploader"
                hidden={!modalOpened}
              >
                <Uploader
                  onUpload={onUpload}
                  modalOpened={[modalOpened, setModalOpened]}
                  siteEntity={siteEntity}
                  siteEntityField={siteEntityField}
                  siteEntityId={siteEntityId}
                  multiple={multiple}
                  compressionType={compressionType}
                  type={"image"}
                />
              </div>,
              document.body
            )}
        </div>
    );
}

export default ImageUploadCustom;
