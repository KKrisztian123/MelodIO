import { useSessionValidation } from "@features/Auth/Index";
import AnimatedRoute, { AnimatedRouteProps } from "./AnimatedRoute";
import { Redirect } from "react-router";
import { PropsWithChildren } from "react";

const AuthenticatedRoute = (props: PropsWithChildren<AnimatedRouteProps>) => {
  const isValid = useSessionValidation();
  return isValid ? <AnimatedRoute {...props} /> : <Redirect to={"/login"} />;
};

export default AuthenticatedRoute;
