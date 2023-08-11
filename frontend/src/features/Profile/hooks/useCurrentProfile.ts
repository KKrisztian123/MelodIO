import { RootState } from "@/store";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearProfile, setProfile } from "../profileSlice";
import {
  getProfileData,
  saveProfileData,
  emptyUserStorage,
} from "../utils/profileUtils";
import { useSession, useSessionValidation } from "@features/Auth/Index";
import { useAxios } from "@hooks/useFetch";
import { Profile } from "../types";

/** Current user profile state. */
export const useCurrentProfile = () => {
  return useSelector((state: RootState) => state.profile);
};

/** Manages current user profile information. */
export const useCurrentProfileManager = () => {
  const dispatch = useDispatch();
  const { set } = useConfigureCurrentProfile();
  const { userId } = useSession();
  const [fetcher] = useAxios("GET", `/user/${userId}/`);
  const isValid = useSessionValidation();

  useEffect(() => {
    const initProfile = async () => {
      const profileData = await getProfileData();
      dispatch(setProfile(profileData));
      fetcher({}).then((v: APIResponse<Profile>) => {
        if (v.status === "error") return;
        const payload = v.payload;
        payload.lastUpdate !== profileData.lastUpdate && set(payload);
      });
    };

    if (isValid) initProfile();
  }, [dispatch, fetcher, isValid, set]);
};

/** Custom hook for configuring profile information. */
export const useConfigureCurrentProfile = () => {
  const dispatch = useDispatch();
  const clear = useCallback(() => {
    saveProfileData(emptyUserStorage).then(() => dispatch(clearProfile()));
  }, [dispatch]);
  const set = useCallback(
    (data: Profile) => {
      saveProfileData(data).then(() => {
        dispatch(setProfile(data));
      });
    },
    [dispatch]
  );
  return { clear, set };
};
