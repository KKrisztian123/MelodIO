import { useLocation } from "react-router";
import useRouteContext from "./useRouteContext";

/** Gets the current path */
export const useCurrentPath = () => {
  const location = useLocation();
  return location.pathname;
};

/** Returns the current path as a string and as an array */
export const useRouteLocation = () => {
  const path = useCurrentPath();
  const chunks = path.split("/");
  chunks.shift();
  return { path: path, chunks: chunks };
};

/** Gets the current location level or the defined level */
export const useLocationLevel = (nestingLevel?: number) => {
  const context = useRouteContext();
  const level =
    typeof nestingLevel !== "undefined" ? nestingLevel - 1 : context;

  return useRouteLocation().chunks?.[level];
};

/** Gets the current main location */
export const useMainLocation = () => {
  return useLocationLevel(1);
};
