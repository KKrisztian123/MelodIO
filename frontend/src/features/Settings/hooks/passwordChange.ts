import { responseHandler } from "@/utils/utils";
import { useSession } from "@features/Auth/Index";
import { useAnimatedError } from "@hooks/useError";
import { useAxios } from "@hooks/useFetch";
import { PasswordChange } from "../types/Index";

/** Custom hook for changing account password. */
export const usePasswordChange = () => {
  const { userId } = useSession();
  const [fetch, loading] = useAxios("POST", `/user/${userId}/password`);
  const { ref, showError, errorContent } = useAnimatedError();

  const changePassword = (v: PasswordChange) =>
    fetch(v)
      .then((res: APIResponse<object>) =>
        responseHandler(res, showError, () => true)
      )
      .catch(() => showError(true));
  return { changePassword, loading, errorRef: ref, errorContent };
};

/*

{
        res?.status === "error"
          ? showError(res?.message || true)
          : showError(false);
        return res?.status === "success";
      }


*/
