import { PasswordFieldProps } from "@components/Form/input/PasswordField";
import { useSession } from "@features/Auth/Index";
import useError from "@hooks/useError";
import { useAxios } from "@hooks/useFetch";

/** Custom hook for changing account password. */
export const usePasswordChange = () => {
  const { userId } = useSession();
  const [fetch, loading] = useAxios("POST", `/user/${userId}/passwordChange`);
  const { ref, showError, errorContent } = useError();

  const changePassword = (v: PasswordFieldProps) =>
    fetch(v)
      .then((res: APIResponse<object>) => {
        res?.status === "error" ? showError(res?.message || true) : showError(false);
        return res?.status === "success";
      })
      .catch(() => showError(true));
  return { changePassword, loading, errorRef: ref, errorContent };
};
