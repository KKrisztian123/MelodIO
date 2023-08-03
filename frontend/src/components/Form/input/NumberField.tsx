import { FieldValues, RegisterOptions, useFormContext } from "react-hook-form";
import "./fields.css";
import InputFieldWithButton, {
  InputFieldWithButtonProps,
} from "./inputFieldWithButton";

export type NumberFieldProps = {
  /** Identifier for the input field in the form response. */
  id: string;
  /** Displayed name of the input field. */
  label: string;
  /** Optional react-hook-form input registration config */
  config?: RegisterOptions<FieldValues, string> | undefined;
};

/** Number inputfield. */
const NumberField = ({
  id,
  config,
  ...rest
}: NumberFieldProps &
  Omit<
    InputFieldWithButtonProps,
    "type" | "error" | "onChange" | "onBlur" | "name"
  >) => {
  const { register } = useFormContext();
  return (
    <InputFieldWithButton type="number" {...rest} {...register(id, config)} />
  );
};
export default NumberField;
