import { useFormContext } from "react-hook-form";
import type { FieldValues, RegisterOptions } from "react-hook-form";
import InputFieldWithButton, {
  InputFieldWithButtonProps,
} from "./inputFieldWithButton";

export type TextFieldProps = {
  /** Identifier for the input field in the form response. */
  id: string;
  /** Displayed name of the input field. */
  label: string;
  /** Optional react-hook-form input registration config */
  config?: RegisterOptions<FieldValues, string> | undefined;
};

/** Generic Text field */
const TextField = ({
  id,
  config,
  ...rest
}: TextFieldProps &
  Omit<
    InputFieldWithButtonProps,
    "type" | "error" | "onChange" | "onBlur" | "name"
  >) => {
  const { register } = useFormContext<FieldValues>();
  return (
    <InputFieldWithButton type="text" {...rest} {...register(id, config)} />
  );
};
export default TextField;
