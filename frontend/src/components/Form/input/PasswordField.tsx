import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import InputFieldWithButton, {
  InputFieldWithButtonProps,
} from "./inputFieldWithButton";
import { FieldValues, RegisterOptions, useFormContext } from "react-hook-form";
import useToggle from "../../../hooks/useToggle";
import { IconButton } from "../../Button/Button";

export type PasswordFieldProps = {
  /** Identifier for the input field in the form response. */
  id: string;
  /** Displayed name of the input field. */
  label: string;
  /** Optional react-hook-form input registration config */
  config?: RegisterOptions<FieldValues, string> | undefined;
};
/** Password inputfield for forms. */
const PasswordField = ({
  id,
  config,
  ...rest
}: PasswordFieldProps &
  Omit<
    InputFieldWithButtonProps,
    "type" | "rightOrnament" | "error" | "onChange" | "onBlur" | "name"
  >) => {
  const [isActive, toggleActive] = useToggle();
  const { register } = useFormContext();
  return (
    <InputFieldWithButton
      {...rest}
      type={isActive ? "text" : "password"}
      {...register(id, config)}
      rightOrnament={
        <IconButton
          size="medium"
          onClick={() => toggleActive()}
          icon={isActive ? faEyeSlash : faEye}
          type="tertiary"
          label={isActive ? "Mező elrejtése" : "Mező megjelenítése"}
        />
      }
    />
  );
};
export default PasswordField;
