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
      data[key].forEach((element) => {
        formData.append(key, JSON.stringify(element));
      });
    } else {
      formData.append(key, data[key]);
    }
  }
  return formData;
};

export const getImageFromList = (
  list: ImageListOptional | FileList,
  index = 0
) => {
  return Array.isArray(list)
    ? list[index]
    : list instanceof FileList
    ? list[index]
    : false;
};
/** Checks if the provided value is an instace of file */
export const isFile = (file: FormFileOptional) => {
  return typeof file !== "string" && file !== false && file instanceof File;
};

/** Compares the original and new value. */
export const isMatching = (original: string, comparison: string) =>
  original === comparison;

/** Checks if image exists as string or Filelist. */
export const checkFile = (images: ImageListOptional, index?: number) => {
  const file = getImageFromList(images, index);
  return (typeof file === "string" && file !== "") || isFile(file);
};

/** Compares 2 words on a substring level from the start of the words. */
export const wordSubstringMatch = (word: string, comparedWord: string) => {
  return word?.substring(0, comparedWord.length) === comparedWord;
};

/** Checks if a stringified array is not empty. */
export const isStringifiedArrayNotEmpty = (value: string) => {
  try {
    const values = JSON.parse(value);
    return Array.isArray(values) && values.length > 0;
  } catch {
    return false;
  }
};

/** Api response handler */
export const responseHandler = (
  response: APIResponse<any>,
  errorHandler,
  callback?: (v: any) => unknown
) => {
  if (!response) return;
  if (response?.status === "success") {
    if (callback) {
      return callback(response?.payload);
    }
    errorHandler();
    return response?.payload;
  }
  errorHandler(response?.message || true);
  return false;
};

/** Checks if a stringified array does not exceed the specified item count. */
export const isStringifiedArrayNotMaxSize = (value: string, max = 1) => {
  try {
    const values = JSON.parse(value);
    return Array.isArray(values) && values.length <= max;
  } catch {
    return false;
  }
};

/** Merges an array of artists into a list of albums. */
export const mergeArtistsToAlbums = (albums: Album[], artists: Author[]) => {
  if (!albums || !artists) return;
  return albums.map(({ author, ...rest }) => {
    return {
      author: author.map((artistId) =>
        artists.find((artist) => artist.id === artistId)
      ),
      ...rest,
    };
  });
};

/** Merges an array of artists into a song. */
export const mergeArtistsToSong = (song: Song[], artists: Author[]) => {
  if (!song || !artists) return;
  return {
    ...song,
    author: song.author.map(
      (artistId) => artists.find((artist) => artist.id === artistId) || {}
    ),
  };
};

/** Merges album information into song. */
export const mergeAlbumToSong = (song: Song, albums: Album[]) => {
  if (!song || !albums) return;
  return {
    ...song,
    album: albums.find(album => album.id === song.album) || {}
  }
};
