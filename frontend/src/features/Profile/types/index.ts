/** User profile information. */
export type Profile = {
  /** Name of the user. */
  name: string;
  /** Email of the user. */
  email: string;
  /** Optional profile image of the user in base64. */
  image: string | false;
  /** Last update date. */
  lastUpdate: Date;
};

/** User profile information returned from storage. */
export type StorageProfile = Profile & { imageType: false };

/** user profile information request. */
export type ProfileRequest = {
    /** Name of the user. */
    name: string;
    /** Email of the user. */
    email: string;
    /** Optional profile image of the user . */
    image: ImageListOptional;
    /** Last update date. */
    lastUpdate: Date;
}