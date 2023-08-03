import { Preferences } from "@capacitor/preferences";
import { Auth } from "../types";

/** Validates session */
export const isValidSession = ({ session, authLevel, userId }: Auth) => {
  if (authLevel !== "user" && authLevel !== "admin") return false;
  if (!session || session.length <= 0) return false;
  if (!userId || userId < 0) return false;
  return true;
};

/** Stores session in storage. */
export const storeSession = async ({ session, authLevel, userId }: Auth) => {
  await Preferences.set({
    key: "sessionToken",
    value: JSON.stringify(session),
  });
  await Preferences.set({ key: "authLevel", value: JSON.stringify(authLevel) });
  await Preferences.set({ key: "userId", value: JSON.stringify(userId) });
};

/** Retrieves session from storage. */
export const retrieveSession = async () => {
  const { value: session } = await Preferences.get({ key: "sessionToken" });
  const { value: authLevel } = await Preferences.get({ key: "authLevel" });
  const { value: userId } = await Preferences.get({ key: "userId" });

  try {
    return {
      session: session ? JSON.parse(session) : false,
      authLevel: authLevel ? JSON.parse(authLevel) : false,
      userId: userId ? JSON.parse(userId) : false,
    } as Auth;
  } catch {
    return { session, authLevel, userId } as unknown as Auth;
  }
};
