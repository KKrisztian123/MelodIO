import { useContext } from "react";
import { RouteLevelContext } from "../components/Layout/Routing/RouteProvider";

/** Returns the current nesting route level. */
const useRouteContext = () => {
    const context = useContext(RouteLevelContext)
    return context;
}
export default useRouteContext;
