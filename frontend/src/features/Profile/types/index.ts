/** User profile information. */
export type Profile = {
  /** Name of the user. */
  name: string;
  /** Email of the user. */
  email: string;
  /** Optional profile image of the user in base64. */
  image: string | false;
  /** Serialized last update date. */
  lastUpdate: string;
};

/** User profile information returned from storage. */
export type StorageProfile = Profile & { imageType: false };

/** Image of form Request */
export type FormImage = {
  /** Optional image in the form request. */
  image: ImageListOptional;
};

/** Image Form Request */
export type ImageFormRequest = FormImage & {
  /** Values in form request. */
  [key: string]: any;
};

/** user profile information request. */
export type ProfileRequest = FormImage & {
  /** Name of the user. */
  name: string;
  /** Email of the user. */
  email: string;
  /** Serialized last update date. */
  lastUpdate: string;
};
