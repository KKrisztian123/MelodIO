import { useCurrentProfileManager } from "../hooks/useCurrentProfile";

/** Manages Profile information in state. */
export const ProfileManager = () => {
  useCurrentProfileManager();
  return null;
};
