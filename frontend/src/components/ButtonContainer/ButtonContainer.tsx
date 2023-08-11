import styles from "./ButtonContainer.module.css";
import { PropsWithChildren, forwardRef } from "react";

export type ButtonContainerProps = {
  /** Vertically centers the buttons inside the container */
  center?: boolean;
  /** Container classNames */
  className?: string;
};

/** Container used for placing multiple buttons */
const ButtonContainer = forwardRef<HTMLDivElement, PropsWithChildren<ButtonContainerProps>>(
  (
    {
      center,
      children,
      className,
      ...rest
    },
    ref
  ) => {
    return (
      <div
        {...rest}
        ref={ref}
        className={`${styles.container} ${className} ${
          center ? styles.center : ""
        }`}
      >
        {children}
      </div>
    );
  }
);

ButtonContainer.displayName = "ButtonContainer";
export default ButtonContainer;
