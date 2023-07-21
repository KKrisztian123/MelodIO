import buttonStyle from "./Button.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import { Link } from "react-router-dom";
import type { MouseEvent } from "react";

export type ButtonProps = {
  /** Size of the button */
  size?: "small" | "medium" | "large" | "extraLarge";
  /** Type of the button */
  type?: "primary" | "secondary" | "tertiary";
  /** Text displayed on the button */
  text: string;
  /** Optional Font Awesome Icon on Button */
  icon?: IconProp;
  /** Position of Icon */
  iconPosition?: "left" | "right";
  /** Relative link */
  link?: string;
  /** Function */
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  /** Sets the button type */
  buttonType?: "button" | "submit" | "reset";
  /** Design variant */
  variant?: "box" | "icon";
  /** Active button state */
  isActive?: boolean;
  /** Fully rounded Button */
  isRounded?: boolean;
};

/** Common UI button */
const Button = ({
  text,
  icon,
  type = "primary",
  size = "medium",
  variant = "box",
  iconPosition = "left",
  link,
  onClick,
  buttonType = "button",
  isActive = false,
  isRounded = false,
  ...rest
}: ButtonProps) => {
  if(link) {
    return (
      <Link
        {...rest}
        to={link}
        className={[
          buttonStyle.button,
          buttonStyle[variant],
          buttonStyle[type],
          buttonStyle[size],
          buttonStyle[iconPosition],
          isActive ? buttonStyle.active : "",
          isRounded ? buttonStyle.round : "",
        ].join(" ")}
      >
        <span className={buttonStyle.buttonContainer}>
          {icon && (
            <span className={`${buttonStyle.buttonIcon} `}>
              <FontAwesomeIcon icon={icon} />
            </span>
          )}
          {text && <span className={buttonStyle.buttonText}>{text}</span>}
        </span>
      </Link>
    );
  }
  return (
    <button
      {...rest}
      onClick={onClick}
      className={[
        buttonStyle.button,
        buttonStyle[variant],
        buttonStyle[type],
        buttonStyle[size],
        buttonStyle[iconPosition],
        isActive ? buttonStyle.active : "",
        isRounded ? buttonStyle.round : "",
      ].join(" ")}
      type={buttonType}
    >
      <span className={buttonStyle.buttonContainer}>
        {icon && (
          <span className={`${buttonStyle.buttonIcon} `}>
            <FontAwesomeIcon icon={icon} />
          </span>
        )}
        {text && <span className={buttonStyle.buttonText}>{text}</span>}
      </span>
    </button>
  );
};

export default Button;

export type IconButtonProps = Omit<
  ButtonProps,
  "text" | "iconPosition" | "variant"
> & {
  /** Provides an accessible name for the button. */
  label: string;
};

/** An icon only UI button that has no written text on it. */
export const IconButton = ({ label, ...rest }: IconButtonProps) => (
  <Button {...rest} variant="icon" text="" aria-label={label} />
);
