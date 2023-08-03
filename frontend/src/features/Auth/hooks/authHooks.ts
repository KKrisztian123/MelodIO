import { useCallback, useEffect } from "react";
import {
  isValidSession,
  retrieveSession,
  storeSession,
} from "../utils/sessionUtils";
import { useDispatch, useSelector } from "react-redux";
import { clearAuth, setAuth } from "../authSlice";
import { Auth, Login } from "../types";
import { useAxios } from "@hooks/useFetch";
import useError from "@hooks/useError";
import { RootState } from "@/store";

/** Login hook */
export const useLogin = () => {
  const { set } = useConfigureSession();
  const [fetch, loading] = useAxios("POST", "/login");
  const { ref, showError, errorContent } = useError();

  const login = (v: Login) =>
    fetch(v)
      .then((res: APIResponse<Auth>) => {
        res?.status === "success"
          ? set(res?.payload)
          : showError(res?.message || true);
      })
      .catch(() => showError(true));

  return { login, loading, errorRef: ref, errorContent };
};

/** Hook for accessing session information. */
export const useSession = () => {
  const sessionData = useSelector((state: RootState) => state.auth);
  return sessionData as Auth;
};

/** Hook for checking session validity. */
export const useSessionValidation = () => {
  const session = useSession();
  return isValidSession(session);
};

/** Initialize session from storage. */
export const useInitSession = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    retrieveSession().then((res) => dispatch(setAuth(res)));
  }, [dispatch]);
};

const LoggedOut: Auth = {
  session: false,
  authLevel: false,
  userId: false
};

/** Logout hook */
export const useLogout = () => {
  const { clear } = useConfigureSession();
  const [fetch, loading] = useAxios("GET", "/logout");

  const logout = useCallback(
    () =>
      fetch({}).then((res: APIResponse<object>) => {
        res?.status === "success" && clear();
      }),
    [clear, fetch]
  );

  return { logout, loading };
};

/** Hook for managing session information. */
export const useConfigureSession = () => {
  const dispatch = useDispatch();

  /** Clears session information. */
  const clear = useCallback(
    () => storeSession(LoggedOut).then(() => dispatch(clearAuth())),
    [dispatch]
  );

  /** Clears session information. */
  const set = useCallback(
    (auth: Auth) => storeSession(auth).then(() => dispatch(setAuth(auth))),
    [dispatch]
  );
  return { set, clear };
};
