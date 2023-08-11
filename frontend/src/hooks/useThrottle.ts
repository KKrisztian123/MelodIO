import { useCallback, useRef } from "react";

/** Returns a fuction for throttling function invocations with the given timeout.  */
const useThrottle = (timeout = 300) => {
  const isTimeout = useRef(false);
  const debounceFunc = useCallback(
    (func, ...args) => {
      const context = this;
      if (!isTimeout.current) {
        isTimeout.current = true;
        setTimeout(() => {
          isTimeout.current = false;
          func.apply(context, args);
        }, timeout);
      }
    },
    [timeout]
  );
  return debounceFunc;
};
export default useThrottle;
