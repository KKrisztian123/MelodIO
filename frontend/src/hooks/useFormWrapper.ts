import { useForm } from "react-hook-form";
import type {
  UseFormProps,
  FieldValues,
  UseFormReturn,
  UseFormRegister,
  FieldErrors,
  ChangeHandler,
  RegisterOptions,
  FieldPath,
} from "react-hook-form";
import { useCallback } from "react";
import useDebounce from "./useDebounce";

type FormHookProps = UseFormProps & {
  /** An optional callback function for form changes. */
  onChangeCallback?: (e: FieldValues) => void;
};

/** A custom hook for managing forms */
const useFormWrapper = ({
  onChangeCallback,
  ...rest
}: FormHookProps): UseFormReturn & { errors?: FieldErrors<FieldValues> } => {
  const defaultRequired = "A mező kitöltése kötelező.";
  const {
    register,
    formState: { errors, ...restState },
    handleSubmit,
    getValues,
    ...restOfHook
  }: UseFormReturn = useForm({ ...rest });

  const debouncer = useDebounce();
  const registerWrapper: UseFormRegister<FieldValues> = useCallback(
    (name: any, props) => {
      const { required, ...restProps } = props as RegisterOptions<
        FieldValues,
        FieldPath<FieldValues>
      >;
      const requiredProp =
        typeof required === "object"
          ? required?.value
            ? required?.message || defaultRequired
            : false
          : required;
      const { onChange, ...registerProps } = register(name, {
        required: requiredProp,
        ...restProps,
      });
      const wrappedChangeCallback = () =>
        onChangeCallback && onChangeCallback(getValues());
      const onChangeWrapper = (e: { target: any; type?: any }) => {
        onChange(e);
        onChangeCallback && debouncer(wrappedChangeCallback);
      };
      const error = errors[name] || {};
      const selectedError = {
        errType: error?.type,
        errMessage: error?.message,
      };
      return {
        onChange: onChangeWrapper as ChangeHandler,
        error: selectedError,
        ...registerProps,
      };
    },
    [errors, getValues, register, debouncer, onChangeCallback]
  );
  return {
    register: registerWrapper,
    errors,
    formState: { errors, ...restState },
    handleSubmit,
    getValues,
    ...restOfHook,
  };
};

export default useFormWrapper;
