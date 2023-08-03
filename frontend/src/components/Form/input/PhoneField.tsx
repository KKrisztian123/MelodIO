/* eslint-disable @typescript-eslint/ban-ts-comment */
import { FieldValues, RegisterOptions, useFormContext } from "react-hook-form";
import InputFieldWithButton, {
  InputFieldWithButtonProps,
} from "./inputFieldWithButton";

export type PhoneFieldProps = {
  /** Identifier for the input field in the form response. */
  id: string;
  /** Displayed name of the input field. */
  label: string;
  /** Optional react-hook-form input registration config */
  config?: RegisterOptions<FieldValues, string> | undefined;
};

/** Input field for phone numbers. */
const PhoneField = ({
  id,
  config,
  ...rest
}: Omit<InputFieldWithButtonProps, "type" | "error" | "onChange" | "onBlur" | "name"> & PhoneFieldProps) => {
  const { register } = useFormContext();

  const pattern = {
    value:
      //@ts-ignore
      config?.pattern?.value ||
      /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im,
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
export default PhoneField;
