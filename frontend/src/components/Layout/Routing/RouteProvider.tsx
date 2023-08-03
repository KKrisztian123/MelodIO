import { AnimatePresence } from "framer-motion";
import { createContext, PropsWithChildren, useContext } from "react";
import { Route, Switch } from "react-router";
import { useLocationLevel } from "../../../hooks/locationHooks";

export const RouteLevelContext = createContext(0);

type modes = "wait" | "sync" | "popLayout";

const presenceModes: { [key: string | number]: modes } = {
  default: "wait",
  1: "wait",
  2: "wait",
  3: "wait",
};

export type RoutesProps = {
  /** Presence modes */
  mode?: modes;
};

const Routes = ({ children, mode }: PropsWithChildren<RoutesProps>) => {
  const levelContext = useContext(RouteLevelContext);
  const levelKey = useLocationLevel();
  const presenceMode = mode
    ? mode
    : presenceModes?.[levelContext + 1] || presenceModes.default;

  return (
    <RouteLevelContext.Provider value={levelContext + 1}>
      <Route
        render={({ location }) => (
          <AnimatePresence mode={presenceMode} initial={false}>
            <Switch location={location} key={levelKey}>
              {children}
            </Switch>
          </AnimatePresence>
        )}
      />
    </RouteLevelContext.Provider>
  );
};
export default Routes;
