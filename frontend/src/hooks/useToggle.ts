import { useCallback, useState } from "react";

/**
 *
 * Toggle hook.
 * Returns a stateful value, and a function to update it.
 *
 */
const useToggle = (
  defaultValue = false
): [boolean, (toggle?: boolean) => void] => {
  const [toggle, setToggle] = useState(defaultValue);

  const changeToggle = useCallback(
    (toggle?: boolean) => {
      typeof toggle == "boolean"
        ? setToggle(toggle)
        : setToggle((current) => !current);
    },
    [setToggle]
  );

  return [toggle, changeToggle];
};

export default useToggle;
