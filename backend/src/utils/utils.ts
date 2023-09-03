import { randomBytes } from 'crypto';
import { existsSync, mkdirSync, writeFileSync, readFile, unlinkSync } from 'fs';
import * as path from 'path';

/** Validates and Removes Bearer from header authorization token */
export const stripAuthorizationToken = (authorizationHeader: string) => {
  if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
    return authorizationHeader.slice(7); // Remove 'Bearer ' prefix
  }
  return false;
};

/** Check for empty fields in a request object. Returns `true` if no empty fields are present. */
export const checkEmpty = (requestObject: object) => {
  let isEmpty = false;
  for (const value in requestObject) {
    if (typeof value === 'string') {
      if (value.trim() === '') {
        isEmpty = true;
      }
    }
  }
  return !isEmpty;
};

/** Generates a random unique token. */
export const generateToken = () => {
  return randomBytes(20).toString('hex');
};

/** Supported image MIME types */
export const imageTypes: { [key: string]: string } = {
  'image/png': 'png',
  'image/avif': 'avif',
  'image/gif': 'gif',
  'image/jpeg': 'jpeg',
  'image/svg+xml': 'svg',
  'image/webp': 'webp',
};

/** Supported song MIME types */
export const songTypes: { [key: string]: string } = {
  'audio/mpeg': 'mp3',
  'audio/x-flac': 'flac',
  'audio/wav': 'wav',
  'audio/m4a': 'alac',
};

/** Uploads file to the specified folder. */
export const uploadFile = (dir, fileName, fileBuffer) => {
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
  writeFileSync(path.join(dir, fileName), fileBuffer);
};

/** Uploads file to the specified folder. */
export const deleteFile = (fileLocation) => {
  unlinkSync(fileLocation);
};

export const successResponse = (payload): APIResponse<typeof payload> => {
  return {
    status: 'success',
    payload,
  };
};

export const errorResponse = (message): APIResponse<any> => {
  return {
    status: 'error',
    message: message,
  };
};

/** Gets file from fileSystem and converts it to base64.  */
export const getFileAsBase64 = async (filePath, mimeType) => {
  return new Promise<string>((resolve, reject) => {
    readFile(filePath, (err, data) => {
      if (err) {
        reject(err);
        return;
      }

      const base64Image = `data:${mimeType};base64,${Buffer.from(data).toString(
        'base64',
      )}`;
      resolve(base64Image);
    });
  });
};

/** Creates file path.  */
export const createFilePath = (...relativePath) => {
  return path.join(__dirname, '..', '..', ...relativePath);
};
