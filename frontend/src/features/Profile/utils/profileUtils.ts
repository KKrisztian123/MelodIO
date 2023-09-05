import { Preferences } from "@capacitor/preferences";
import type { Profile, StorageProfile } from "../types";
import { Directory, Filesystem } from "@capacitor/filesystem";
import {
  getB64MIMEType,
  getFileExtension,
  getFileType,
  setB64DataUri,
} from "@/utils/utils";

const PROFILE_LOCATION = "profile/profileImage";

export const emptyUserStorage: StorageProfile = {
  name: "",
  email: "",
  image: false,
  imageType: false,
  lastUpdate: new Date().toJSON(),
};

/** Saves profile data to storage. */
export const saveProfileData = async ({ image, ...rest }: Profile) => {
  const imageType = image && getFileType(image);
  await Preferences.set({
    key: "profile",
    value: JSON.stringify({
      ...rest,
      imageType: image && getB64MIMEType(image),
    }),
  });

  return (
    imageType &&
    (await Filesystem.writeFile({
      path: `${PROFILE_LOCATION}.${imageType}`,
      data: image, //base64
      directory: Directory.Data,
      recursive: true,
    }))
  );
};

/** Parses stored profile data. */
const parseProfileData = (profileData: string) => {
  try {
    return JSON.parse(profileData);
  } catch (error) {
    return emptyUserStorage;
  }
};

/** Gets profiledata from storage */
export const getProfileData = async () => {
  const { value: profileData } = await Preferences.get({
    key: "profile",
  });

  const { imageType = false, ...rest }: StorageProfile = profileData
    ? parseProfileData(profileData)
    : emptyUserStorage;
  const fileExtension = imageType && getFileExtension(imageType);
  const image = fileExtension
    ? await Filesystem.readFile({
        path: `${PROFILE_LOCATION}.${fileExtension}`,
        directory: Directory.Data,
      })
    : false;
  return {
    ...rest,
    image: image && imageType ? setB64DataUri(image?.data, imageType) : image,
  } as Profile;
};
