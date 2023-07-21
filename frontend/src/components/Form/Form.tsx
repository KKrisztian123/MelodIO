import PropTypes from "prop-types";
import { FormProvider } from "react-hook-form";
import type { FieldValues } from "react-hook-form";
import useFormWrapper from "../../hooks/useFormWrapper";
import type { PropsWithChildren, DOMAttributes } from "react";

/**
 * Custom form component with a built in inputhandler.
 * @param {func} onSubmit - Function to be executed on form submission.
 * @param {func} onChange - Optional function to be executed on form value changes.
 * @param {object} defaultValues - Optional defaultValues for the inputfields.
 *
 */

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

Form.propTypes = {
  /** Sets default values for the inputs, the input ids are used as the object keys */
  defaultValues: PropTypes.object,

  /** function to execute on form submit */
  onSubmit: PropTypes.func.isRequired,

  /** function to execute on form input changes */
  onChange: PropTypes.func,
};
