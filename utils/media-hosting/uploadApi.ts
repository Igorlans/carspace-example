"use client"

const apiUrl = "https://sleeksoul.com/carspace/api/";
const apiMethods: { [key: string]: string } = {
  'image': 'upload_image',
  'video': 'upload_video'
};
const apiToken = "cTkzOHJoMHFnLXFxZzk9aHEzOWhnPXFxaGc9Z2Rqdm5zdg";

export const allowedFiletypes: { [key: string]: string[] } = {
  'image': ['png', 'jpe', 'jpeg', 'jpg', 'gif', 'webp'],
  'video': ['mp4', 'webm', 'mpg', 'mpeg', 'm4v']
};

export const apiErrors: { [key: string]: string } = {
  'invalid_site_entity': 'toastErrorInvalidSiteEntity',
  'invalid_site_entity_field': 'toastErrorInvalidSiteEntityField',
  'no_file_uploaded': 'toastErrorNoFileUploaded',
  'filetype_is_not_supported': 'toastErrorFiletype',
  'error_occured': 'toastError'
};

// interface uploadFileProps {
//   file: object,
//   siteEntity: string,
//   siteEntityField: string,
//   siteEntityId: string,
//   compressionType?: boolean | string,
//   type?: string
// }

export async function uploadApi(
                                file: any,
                                siteEntity: string,
                                siteEntityField: string,
                                siteEntityId: string,
                                compressionType: any = 'raw',
                                type: string = 'image'
                                ){

  const formData = new FormData();
  formData.append('token', apiToken);
  formData.append('site_entity', siteEntity);
  formData.append('site_entity_field', siteEntityField);
  formData.append('site_entity_id', siteEntityId);
  formData.append('file', file);

  if(type === 'image' && compressionType != false){
    formData.append('compression_type', compressionType);
  }

  const method = Object.keys(apiMethods).indexOf(type) !== -1 ? apiMethods[type] : apiMethods['image'];
  const url = String(apiUrl).concat(method);

  var response = await fetch(url, {
   method: 'POST',
   mode: 'cors',
   cache: 'no-cache',
   body: formData
  });

  var responseData = await response.json();


  return responseData;

}
