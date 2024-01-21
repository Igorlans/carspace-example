"use client"

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Trash } from 'lucide-react';
import {toast} from "react-hot-toast";
import { uploadApi, apiErrors, allowedFiletypes } from '@/utils/media-hosting/uploadApi';
// import { t } from '@/utils/media-hosting/translations';
import {useTranslations} from "use-intl";
import {createTranslator} from 'next-intl';
import messages from '@/messages/ru.json';


const mimeTypes: { [key: string]: string } = {
  'image': 'image/*',
  'video': 'video/*'
};


interface UploaderProps {
  onUpload: (value: string) => void;
  modalOpened: any[];
  siteEntity: string;
  siteEntityField: string;
  siteEntityId: string;
  multiple?: boolean;
  multipleLimit?: number;
  compressionType?: string;
  type?: string;
}

const Uploader: React.FC<UploaderProps> = ({
  onUpload,
  modalOpened,
  siteEntity,
  siteEntityField,
  siteEntityId,
  multiple = false,
  multipleLimit = 3,
  compressionType = 'light',
  type = 'image',
}) => {

  const [modal, setModal] = modalOpened;
  const [files, setFiles] = useState<any[]>([]);
  const [filesImage, setFilesImage] = useState<any[]>([]);
  const fileInput = useRef<HTMLInputElement>(null);

  var t: any = (tr: string) => {return tr;};
  try {
    t = useTranslations("mediaHosting");
  } catch (error) {
    // console.log('Messages', messages);
    t = createTranslator({locale: 'ru', namespace: 'mediaHosting', messages: messages});
  }

  const handleCloseModal = (e: any) => {
    e.preventDefault();
    setModal(false);
    return false;
  }

  const handleInputChange = async (e: any) => {
    const {id, value} = e.target;

    if(id === 'customMediaHostingFile' && e.target.files){

      var newFiles: any[] = [];
      var newFilesImage: any[] = [];

      var curLimit = multiple ? multipleLimit : 1;

      for (let index = 0; index < curLimit; index++) {
        if(e.target.files.length >= (index + 1)){

          // Makes check on allowedFiletypes
          var curFiletype = e.target.files[index].name.split('.').pop().toLowerCase();
          if(allowedFiletypes[type].indexOf(curFiletype) !== -1){
            newFiles.push(e.target.files[index]);
            newFilesImage.push(URL.createObjectURL(e.target.files[index]));
          } else {
            var errorText = t(apiErrors['filetype_is_not_supported']);
            toast.error(String(errorText));
          }

        }
      }

      setFiles(newFiles);
      setFilesImage(newFilesImage);
    }
  }


  const handleFileRemove = (e: any) => {
    e.preventDefault();

    var fileIndex = e.currentTarget.getAttribute('data-file-index');

    if(fileIndex){
      var newFiles = [...files];
      var newFilesImage = [...filesImage];
      newFiles.splice(parseInt(fileIndex), 1);
      newFilesImage.splice(parseInt(fileIndex), 1);
      setFiles(newFiles);
      setFilesImage(newFilesImage);
    }

    return false;
  }


  function renderImageFile(file: object, i: number){

    var src = filesImage[i];

    return (
      <div className="relative w-[150px] h-[150px] rounded-md overflow-hidden">
        <div className="z-10 absolute top-2 right-2">
          <Button type="button" onClick={handleFileRemove} variant="destructive" size="sm" data-file-index={i}>
            <Trash className="h-4 w-4" />
          </Button>
        </div>
        <Image
            fill
            sizes={'50vw'}
            className="object-cover"
            alt={siteEntity}
            src={src}
        />
      </div>
    );
  }


  function renderVideoFile(file: object, i: number){

    var src = filesImage[i];

    return (
      <div className="relative w-[150px] h-[150px] rounded-md overflow-hidden">
        <div className="z-10 absolute top-2 right-2">
          <Button type="button" onClick={handleFileRemove} variant="destructive" size="sm" data-file-index={i}>
            <Trash className="h-4 w-4" />
          </Button>
        </div>
        <video className="object-cover">
          <source src={src} />
        </video>
      </div>
    );
  }


  const handleInitFile = (e: any) => {
    // console.log('input ref', fileInput);
    fileInput?.current?.click();
  }


  const handleDrop = (e: any) => {
    e.preventDefault();

    var newFiles: any[] = [];
    var newFilesImage: any[] = [];

    if (e.dataTransfer.items) {


      [...e.dataTransfer.items].forEach((item, i) => {
        // If dropped items aren't files, reject them
        if (item.kind === "file") {
          const file = item.getAsFile();

          // Makes check on allowedFiletypes
          var curFiletype = file.name.split('.').pop().toLowerCase();
          if(allowedFiletypes[type].indexOf(curFiletype) !== -1){
            newFiles.push(file);
            newFilesImage.push(URL.createObjectURL(file));
          } else {
            var errorText = t(apiErrors['filetype_is_not_supported']);
            toast.error(errorText);
          }

        }
      });
    } else {
      // Use DataTransfer interface to access the file(s)
      [...e.dataTransfer.files].forEach((file, i) => {
        // Makes check on allowedFiletypes
        var curFiletype = file.name.split('.').pop().toLowerCase();
        if(allowedFiletypes[type].indexOf(curFiletype) !== -1){
          newFiles.push(file);
          newFilesImage.push(URL.createObjectURL(file));
        } else {
          var errorText = t(apiErrors['filetype_is_not_supported']);
          toast.error(errorText);
        }
      });
    }

    setFiles(newFiles);
    setFilesImage(newFilesImage);

    return false;
  }


  const handleDragOver = (e: any) => {
    e.preventDefault();
  }


  const handleSubmit = async (e: any) => {
    e.preventDefault();

    toast.loading(t('toastLoading'), {id: 'loading'});

    var successfulFileIndexes: any[] = [];

    files.forEach(async (file, i) => {

      const response = await uploadApi(
        file,
        siteEntity,
        siteEntityField,
        siteEntityId,
        compressionType,
        type
      );

      // console.log('Upload response', response);
      if(response.status === true){
        toast.success(t('toastSuccess'));
        successfulFileIndexes.push(i);
        onUpload(response);

      } else if('error' in response) {
        const errorText = Object.keys(apiErrors).indexOf(response.error) ? apiErrors[response.error] : apiErrors['error_occured'];
        toast.error(t(errorText));
      } else {
        const errorText = t(apiErrors['error_occured']);
        toast.error(errorText);
      }

      var newFiles: any[] = [];
      var newFilesImage: any[] = [];

      files.forEach((file, i) => {
        if(successfulFileIndexes.indexOf(i) === -1){
          newFiles.push(file)
          newFilesImage.push(filesImage[i])
        }
      });

      setFiles(newFiles);
      setFilesImage(newFilesImage);

      if(newFiles.length == 0){
        setModal(false);
      }

      toast.dismiss('loading');
    });

  }


  function renderActions(){

    if(files.length > 0){
      return (
        <>
        <p className="text-sm text-gray-500">{t('modalApprovement')}</p>
        <div className="mb-4 flex items-center gap-4">
          {files.map((file, i) => {
            if(type === 'image'){
              return renderImageFile(file, i);
            }

            if(type === 'video'){
              return renderVideoFile(file, i);
            }
          })}
        </div>
        </>
      );
    } else {

      var mimeType = Object.keys(mimeTypes).indexOf(type) !== -1 ? mimeTypes[type] : mimeTypes['image'];

      return (
        <>
        <p className="text-sm text-gray-500">{t('modalInitial')}</p>
        <div className="col-span-full" onDrop={handleDrop} onDragOver={handleDragOver}>
          <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
            <div className="text-center">
              <svg className="mx-auto h-12 w-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clip-rule="evenodd" />
              </svg>
              <div className="mt-4 flex text-sm leading-6 text-gray-600">
                <p className="relative cursor-pointer rounded-md bg-white font-semibold text-gray-900 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-gray-500">
                  <span onClick={handleInitFile}>{t('modalButton')}</span>
                  <input
                    ref={fileInput}
                    id="customMediaHostingFile"
                    name="customMediaHostingFile"
                    type="file"
                    className="sr-only"
                    multiple={multiple}
                    onChange={handleInputChange}
                    accept={mimeType}
                  />
                </p>
                <p className="pl-1">{t('modalDragNDrop')}</p>
              </div>
              {/*<p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF до 10MB</p>*/}
            </div>
          </div>
        </div>
        </>
      );
    }

  }

  // var modalStyles = siteEntity == 'Review' ? '' : ' w-screen ';
  // var modalStylesReview = siteEntity == 'Review' ? 'fixed w-full ' : 'flex ';

  var modalStyles = ' w-screen ';
  var modalStylesReview = 'flex ';


  return (
    <div className=" fixed top-0 right-0 left-0 z-[100] justify-center items-center w-full" aria-labelledby="File upload" role="dialog" aria-modal={modal}>

      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

      <div className={String("fixed inset-0 z-10 overflow-y-auto").concat(modalStyles)}>
        <div className={String(modalStylesReview).concat(" min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0")}>
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">

                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                  <h3 className="text-base font-semibold leading-6 text-gray-900" id="modal-title">{t('modalTitle')}</h3>
                  <div className="mt-2">

                    {renderActions()}

                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button type="button" className="inline-flex w-full justify-center rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 sm:ml-3 sm:w-auto" onClick={handleSubmit}>{t('modalSubmit')}</button>
              <button type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-medium text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto" onClick={handleCloseModal}>{t('modalCancel')}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Uploader;
