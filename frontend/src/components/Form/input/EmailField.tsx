/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useFormContext } from "react-hook-form";
import type { FieldValues, RegisterOptions } from "react-hook-form";
import InputFieldWithButton, {
  InputFieldWithButtonProps,
} from "./inputFieldWithButton";

export type EmailFieldProps = {
  /** Identifier for the input field in the form response. */
  id: string;
  /** Displayed name of the input field. */
  label: string;
  /** Optional react-hook-form input registration config */
  config?: RegisterOptions<FieldValues, string> | undefined;
};

/** Input field for email addresses. */
const EmailField = ({
  id,
  config,
  ...rest
}: EmailFieldProps &
  Omit<
    InputFieldWithButtonProps,
    "type" | "error" | "onChange" | "onBlur" | "name"
  >) => {
  const { register } = useFormContext();
  const pattern = {
    //@ts-ignore
    value: config?.pattern?.value || /\S+@\S+\.\S+/,
    //@ts-ignore
    message: config?.pattern?.message || "A formátum nem megfelelő.",
  };
  return (
    <InputFieldWithButton
      type="text"
      {...rest}
      //@ts-ignore
      {...register(id, { ...config, pattern: pattern })}
    />
  );
};
export default EmailField;
