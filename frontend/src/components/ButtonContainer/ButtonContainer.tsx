import styles from "./ButtonContainer.module.css";
import { PropsWithChildren } from "react";


export type ButtonContainerProps = {
    /** Vertically centers the buttons inside the container */
    center?: boolean;
    /** Container classNames */
    className?: string;
}

/** Container used for placing multiple buttons */
const ButtonContainer = ({center, children, className, ...rest}:  PropsWithChildren<ButtonContainerProps>) => {
    return(
        <div {...rest} className={`${styles.container} ${className} ${center ? styles.center : ""}`}>
            {children}
        </div>
    )
}

export default ButtonContainer;