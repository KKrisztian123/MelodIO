import { useAnimate } from "framer-motion";
import { useCallback, useState } from "react";

/** A custom hook for managing text based errors. This hook should be used alongside the `ErrorText` component. */
const useError = () => {
  const [scope, animate] = useAnimate();
  const [errorContent, setErrorContent] = useState<string | false>(false);

  const showError = useCallback(
    async (e: string | boolean | undefined = false) => {
      if (typeof e === "string") {
        setErrorContent(e);
      }else
      if (e) {
        setErrorContent("Valami hiba történt!");
      } else {
        setErrorContent(false);
      }
      await animate(scope.current, { opacity: 1, x: 10 }, { duration: 0.1 });
      await animate(scope.current, { x: -20 }, { duration: 0.1 });
      await animate(scope.current, { x: 20 }, { duration: 0.1 });
      await animate(scope.current, { x: -10 }, { duration: 0.1 });
      await animate(scope.current, { x: 0 }, { duration: 0.1 });
    },
    [animate, scope]
  );
  return { showError, ref: scope, errorContent };
};

export default useError;
