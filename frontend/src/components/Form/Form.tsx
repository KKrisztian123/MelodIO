import { FormProvider } from "react-hook-form";
import type { FieldValues } from "react-hook-form";
import useFormWrapper from "../../hooks/useForm";
import type { PropsWithChildren, DOMAttributes } from "react";

export type FormProps = {
  /** An optional callback function for form changes. */
  onChange?: (e: FieldValues) => void;
  /** Callback function for form submission. */
  onSubmit: (e: FieldValues) => void;
  /** Sets default values for the inputs, the input ids are used as the object keys. */
  defaultValues?: { [key: string]: any };
  /** Optional form dom attributes */
  restProps?: Omit<DOMAttributes<HTMLFormElement>, "onSubmit">;
};

/** Custom form component with a built in input handler. */
const Form = ({
  children,
  onChange,
  onSubmit,
  defaultValues,
  ...restProps
}: PropsWithChildren<FormProps>) => {
  const methods = useFormWrapper({
    defaultValues: defaultValues,
    onChangeCallback: onChange,
  });
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods?.handleSubmit(onSubmit)} {...restProps}>
        {children}
      </form>
    </FormProvider>
  );
};
export default Form;