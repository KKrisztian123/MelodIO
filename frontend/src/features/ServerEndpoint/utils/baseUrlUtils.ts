import { Preferences } from "@capacitor/preferences";
import axios from "axios";

/** Gets base Url form storage */
export const getBaseUrl = async () => {
  const { value } = await Preferences.get({ key: "endpoint" });
  return value;
};

/** Stores base Url in storage */
export const storeBaseUrl = async (baseUrl: string) =>
  await Preferences.set({ key: "endpoint", value: baseUrl });

/** Configures the base url of the app from storage. */
export const initializeBaseUrl = async () => {
  await getBaseUrl().then((res) => {
    if (typeof res === "string") {
      axios.defaults.baseURL = res;
    }
  });
};
