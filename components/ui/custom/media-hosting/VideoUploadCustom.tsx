"use client";
import {CldUploadWidget, CldVideoPlayer} from 'next-cloudinary';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';
import {LuFileVideo2} from "react-icons/lu";
import 'next-cloudinary/dist/cld-video-player.css';
import Uploader from '@/components/ui/custom/media-hosting/Uploader';
import { t } from '@/utils/media-hosting/translations';
import {createPortal} from "react-dom";


interface VideoUploadCustomProps {
    disabled?: boolean;
    onChange: (value: string) => void;
    onRemove: (value: string) => void;
    value: string[];
    multiple?: boolean;
    siteEntity?: string;
    siteEntityField?: string;
    siteEntityId?: string;
}

const VideoUploadCustom: React.FC<VideoUploadCustomProps> = ({
                                                        disabled,
                                                        onChange,
                                                        onRemove,
                                                        value,
                                                        multiple = false,
                                                        siteEntity = 'Product',
                                                        siteEntityField = 'video',
                                                        siteEntityId = 'new'
                                                      }) => {
    const [isMounted, setIsMounted] = useState(false);
    const [modalOpened, setModalOpened] = useState(false);


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
                        <CldVideoPlayer
                            width={200}
                            height={200}
                            src={url}
                        />
                    </div>
                ))}
            </div>
            <div id={'widgetContainer'} style={{pointerEvents: 'all'}}>
              <Button
                  type="button"
                  disabled={disabled}
                  variant="secondary"
                  onClick={onClick}
              >
                  <LuFileVideo2 className="h-4 w-4 mr-2" />
                  {t('buttonUploadVideo')}
              </Button>
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
                  type={"video"}
                />
              </div>,
              document.body
            )}
        </div>

    );
}

export default VideoUploadCustom;
