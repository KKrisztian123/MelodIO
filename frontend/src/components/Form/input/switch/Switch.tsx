/* eslint-disable @typescript-eslint/ban-ts-comment */
import { FieldValues, RegisterOptions, useFormContext } from "react-hook-form";
import styles from "./Switch.module.css";
import "../fields.css";
import { HTMLProps, forwardRef, useId } from "react";
import useToggle from "../../../../hooks/useToggle";

export type InputSwitchProp = {
  /** Identifier of the switch */
  id: string;
  /** Displayed name of the switch. */
  label: string;
  /** Current state value of the switch. */
  checked?: boolean;
  /** If `true` it puts the switch into an error state. */
  error?: boolean;
  /** Default value of the switch. */
  defaultChecked?: boolean;
  /** Optional change callback function */
  onChange?: (e: any) => void;
} & Omit<Partial<HTMLProps<HTMLInputElement>>, "ref">;

/** Generic switch. */
const SwitchTemplate = forwardRef<HTMLInputElement, InputSwitchProp>(
  ({ id, label, defaultChecked, error, onChange, ...rest }, ref) => {
    const customId = useId();
    return (
      <div className={styles.switchContainer}>
        <label >
        <p className={error ? "inp-error" : ""}>{label}</p>
          <span className={styles.switchWrapper}>
            <input
              ref={ref}
              type="checkbox"
              role="switch"
              onChange={onChange}
              id={`${customId}-${id}`}
              {...rest}
              className={styles.switch}
              defaultChecked={defaultChecked}
            />
            <span className={styles.switchThumb} />
          </span>
        </label>
      </div>
    );
  }
);

SwitchTemplate.displayName = "Switch";

type FormProps = {
  /** Optional react-hook-form input registration config */
  config?: RegisterOptions<FieldValues, string>;
};

/** Switch Input component for use inside forms. */
export const FormSwitch = ({
  id: formId,
  config,
  ...props
}: InputSwitchProp & FormProps) => {
  const { register } = useFormContext<FieldValues>();
  const {
    //@ts-ignore
    error: { errMessage },
    onChange,
    ...rest
  } = register(formId, config);
  return (
    <SwitchTemplate
      id={formId}
      {...props}
      {...rest}
      onChange={onChange}
      error={errMessage}
    />
  );
};

/** Switch Input component for non forms use. */
const Switch = ({
  defaultChecked,
  onChange,
  ...props
}: InputSwitchProp & { onChange: (value: boolean) => void }) => {
  const [toggle, changeToggle] = useToggle(defaultChecked);
  const change = () => {
    onChange(toggle);
    changeToggle();
  };

  return (
    <SwitchTemplate
      {...props}
      checked={toggle}
      onChange={() => change()}
    />
  );
};

export default Switch;
/*
            <Switch.Root className="switch" id={`${customId}-${label}`} checked={checked} onChange={onChange}>
                <Switch.Thumb className="switch-thumb"/>
            </Switch.Root>

            */
