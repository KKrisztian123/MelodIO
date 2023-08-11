import { useSessionValidation, useSession } from "@features/Auth/Index";
import AnimatedRoute, { AnimatedRouteProps } from "./AnimatedRoute";
import { Redirect } from "react-router";
import { PropsWithChildren } from "react";

const AuthenticatedRoute = ({
  adminRoute = false,
  ...props
}: PropsWithChildren<AnimatedRouteProps & { adminRoute?: boolean }>) => {
  const isValid = useSessionValidation();
  const { authLevel } = useSession();
  if (adminRoute && authLevel !== "admin") return <Redirect to={"/login"} />;
  return isValid ? <AnimatedRoute {...props} /> : <Redirect to={"/login"} />;
};

export default AuthenticatedRoute;
