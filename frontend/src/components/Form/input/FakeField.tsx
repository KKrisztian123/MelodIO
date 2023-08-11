import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PropsWithChildren, ReactNode } from "react";
import "./fields.css";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";

export type FakeFieldProps = {
  /** Value of inputfield */
  value?: string;
  /** Left hand side icon inside field. */
  icon?: IconProp;
  /** Optional right side decorator ornament. */
  rightOrnament?: ReactNode;
};

/** Fake input field. This field contains no input component. */
const FakeField = ({
  children,
  value,
  rightOrnament,
  icon,
}: PropsWithChildren<FakeFieldProps>) => {
  return (
    <div className="inp-wrapper">
      <div className="inp-block-wrapper">
        <div className="inp fake">
          {icon && (
            <div className="left-icon">
              <FontAwesomeIcon icon={icon} />
            </div>
          )}
          <span className="fake-input">
            <span>{value}</span>
          </span>
          <span className="focus-bg"></span>
          {rightOrnament && (
            <span className="right-ornament">{rightOrnament}</span>
          )}
        </div>
      </div>
      {children}
    </div>
  );
};

export default FakeField;
