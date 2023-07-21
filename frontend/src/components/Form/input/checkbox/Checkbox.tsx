/* eslint-disable @typescript-eslint/ban-ts-comment */
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { FieldValues, RegisterOptions } from "react-hook-form";
import { useId } from "react";
import { useFormContext } from "react-hook-form";
import "./checkbox.css";

export type CheckboxProps = {
    /** Identifier for the checkbox in the form response. */
    id: string;
    /** Displayed name of the checkbox. */
    label: string;
    /** Optional react-hook-form input registration config */
    config?: RegisterOptions<FieldValues, string> | undefined;
    /** Default checked state of the checkbox. */
    defaultChecked?: boolean
  };


/** Checkbox input for forms */
const Checkbox = ({ id: formId, label, config, defaultChecked }: CheckboxProps) => {
  const { register } = useFormContext<FieldValues>();
  const {
    //@ts-ignore
    error: { errMessage },
    ...rest
  } = register(formId, config);
  const id = useId();
  return (
    <div className="checkbox-container">
      <div className="checkbox">
        <input type="checkbox" id={`${id}-${formId}`} {...rest}  defaultChecked={defaultChecked} />
        <FontAwesomeIcon icon={faCheck} />
      </div>
      <label htmlFor={`${id}-${formId}`}>
        <p className={errMessage && "inp-error"}>{label}</p>
      </label>
    </div>
  );
};
export default Checkbox;

