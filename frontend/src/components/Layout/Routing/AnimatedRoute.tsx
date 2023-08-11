import { Route, RouteProps } from "react-router-dom";
import { FC, PropsWithChildren } from "react";
import {
  type Target,
  type VariantLabels,
  motion,
  type TargetAndTransition,
  type AnimationControls,
  MotionStyle,
} from "framer-motion";
import styles from "./AnimatedRoute.module.css";
import useRouteContext from "../../../hooks/useRouteContext";

const routeLevelAnimations: { [key: string | number]: keyof typeof AnimationConfig } = {
  default: "fade",
  1: "verticalPan",
  2: "scale",
  3: "fade",
};

const AnimationConfig: {
  [key: string]: {
    initial: boolean | Target | VariantLabels;
    animate:
      | boolean
      | VariantLabels
      | TargetAndTransition
      | AnimationControls
      | undefined;
    exit: TargetAndTransition | VariantLabels;
  };
} = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  maintain: {
    initial: { opacity: 1 },
    animate: { opacity: 1 },
    exit: { opacity: 1 },
  },
  horizontalSlideParent: {
    initial: { opacity: 0, translateX: "-10%"},
    animate: { opacity: 1, translateX: 0},
    exit: { opacity: 0, translateX: "-10%" },
  },
  verticalSlideParent: {
    initial: { opacity: 0, translateY: "10%"},
    animate: { opacity: 1, translateY: 0},
    exit: { opacity: 0, translateY: "10%" },
  },
  overlap: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 1 },
  },
  verticalSlide: {
    initial: { opacity: 0, translateY: "25%", zIndex:1 },
    animate: { opacity: 1, translateY: 0, zIndex:1 },
    exit: { opacity: 0, translateY: "25%", zIndex:1 },
  },
  horizontalSlide: {
    initial: { opacity: 0, translateX: "25%", zIndex:1 },
    animate: { opacity: 1, translateX: 0, zIndex:1 },
    exit: { opacity: 0, translateX: "25%", zIndex:1 },
  },
  verticalPan: {
    initial: { opacity: 0, translateY: 20 },
    animate: { opacity: 1, translateY: 0 },
    exit: { opacity: 0, translateY: -20 },
  },
  horizontalPan: {
    initial: { opacity: 1, translateX: "100%" },
    animate: { opacity: 1, translateX: 0 },
    exit: { opacity: 0, translateX: "-50%" },
  },
  scale:{
    initial: { opacity: 0, scale: 0.98 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.02 },
  }
};

export type AnimatedRouteProps = Omit<RouteProps, "component"> & {
  component?: FC;
  type?: "auto" | keyof typeof AnimationConfig;
  style?: MotionStyle; 
};
/** Animated react router route. */
const AnimatedRoute = ({
  children,
  path,
  type = "auto",
  component: Component,
  style = {},
  ...rest
}: PropsWithChildren<AnimatedRouteProps>) => {
  const level = useRouteContext();

  const animations =
    type === "auto"
      ? AnimationConfig[
          routeLevelAnimations?.[level] || routeLevelAnimations.default
        ]
      : AnimationConfig[type];
  return (
    <Route path={path} {...rest}>
      <motion.div
        className={styles.routeWrapper}
        initial={animations.initial}
        animate={animations.animate}
        exit={animations.exit}
        transition={{ duration: 0.25 }}
        style={{ background: "#fff" , ...style}}
      >
        {Component && <Component />}
        {children}
      </motion.div>
    </Route>
  );
};

export default AnimatedRoute;
