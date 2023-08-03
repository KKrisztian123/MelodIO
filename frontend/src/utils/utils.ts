/** Supported image MIME types */
export const imageTypes: { [key: string]: string } = {
  "image/png": "png",
  "image/avif": "avif",
  "image/gif": "gif",
  "image/jpeg": "jpeg",
  "image/svg+xml": "svg",
  "image/webp": "webp",
};

/** Gets MIME type from base64 file. */
export const getB64MIMEType = (base64File: string) => {
  const parts = base64File.split(";base64,");
  const type = parts[0].replace("data:", "");
  return type;
};

/** Gets file extension for the MIME type */
export const getFileExtension = (MIMEType: string) => {
  return MIMEType in imageTypes ? imageTypes[MIMEType] : false;
};

/** Get filetype of base64 file from supported file list. */
export const getFileType = (base64File: string) =>
  getFileExtension(getB64MIMEType(base64File));

/** Adds Data uri to base64 */
export const setB64DataUri = (b64: string, MIMEType: string) => {
  return "data:" + MIMEType + ";base64," + b64;
};

/** Converts image to base64. */
export const imageToB64 = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
  });

export const createFormData = (data: object) => {
  const formData = new FormData();
  for (const key in data) {
    if (Array.isArray(data[key])) {
      formData.append(`${key}[]`, data[key]);
    } else {
      formData.append(key, data[key]);
    }
  }
  return formData;
};

export const getImageFromList = (list: ImageListOptional, index = 0) => {
  return Array.isArray(list) ? list[index] : false;
};

export const isImageFile = (image: FormImageOptional) => {
  return typeof image !== "string" && image !== false && image instanceof File;
};
