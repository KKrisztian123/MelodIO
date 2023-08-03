/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useState, useCallback } from "react";
import "./fields.css";
import Modal from "../../Modal/Modal";
import { format, formatISO, parse, isValid } from "date-fns";
import { useFormContext } from "react-hook-form";
import type { FieldValues, RegisterOptions } from "react-hook-form";
import InputFieldWithButton, {
  InputFieldWithButtonProps,
} from "./inputFieldWithButton";
import { hu } from "date-fns/locale";
import useToggle from "../../../hooks/useToggle";
import { IonDatetime } from "@ionic/react";
import { IconButton } from "../../Button/Button";
import { faClock } from "@fortawesome/free-solid-svg-icons";

export type TimeFieldProps = {
  /** Identifier for the input field in the form response. */
  id: string;
  /** Displayed name of the input field. */
  label: string;
  /** Optional react-hook-form input registration config */
  config?: RegisterOptions<FieldValues, string> | undefined;
};
/** Time inputfield for forms. */
const TimeField = ({
  id,
  config,
  ...rest
}: TimeFieldProps &
  Omit<
    InputFieldWithButtonProps,
    "type" | "rightOrnament" | "error" | "onChange" | "onBlur" | "name"
  >) => {
  const [isActive, toggleActive] = useToggle();
  const { register, setValue } = useFormContext();
  const [date, setDate] = useState<false | string>(false); //iso date

  const checkDate = useCallback((v: string) => {
    const targetDate = parse(
      v.replaceAll(/[/.-]/g, "."),
      "H:mm",
      new Date()
    );
    return isValid(targetDate) ? formatISO(targetDate) : false;
  }, []);
  
  const selectDate = useCallback(
    (date: any) => {
      const dateValue = date.target.value;
      setDate(dateValue); //iso
      const validatedDate = isValid(new Date(dateValue)) ? new Date(dateValue) : new Date();
      setValue(id, format(validatedDate, "H:mm", { locale: hu }), {
        shouldValidate: true,
      }); //reformatted
      toggleActive(false);
    },
    [id, setValue, toggleActive]
  );

  const isEmpty = useCallback(
    (val: string) => {
      return val === "" ? true : typeof checkDate(val) === "string";
    },
    [checkDate]
  );

  const { onChange, ...restOfRegister } = register(id, {
    ...config,
    validate: {
      isDate: (v) => isEmpty(v) || "Érvénytelen idő",
    },
  });

  const onChangeWrapper = useCallback((e: any) => {
    checkDate(e.target.value) && setDate(checkDate(e.target.value));
    onChange(e);
  }, [checkDate, onChange]);

  return (
    <>
      <InputFieldWithButton
        {...rest}
        {...restOfRegister}
        //@ts-ignore
        onChange={onChangeWrapper}
        type={"text"}
        rightOrnament={
          <IconButton
            size="medium"
            onClick={() => toggleActive()}
            icon={faClock}
            type="tertiary"
            label={isActive ? "Mező elrejtése" : "Mező megjelenítése"}
          />
        }
      />
      <Modal
        isOpen={isActive}
        changeOpen={toggleActive}
        title="Válassz időt."
      >
        <IonDatetime
          presentation="time"
          onIonChange={selectDate}
          value={date ? date : null}
          showDefaultButtons={true}
          cancelText="Bezár"
          doneText="Befejezés"
          onIonCancel={() => toggleActive()}
        />
      </Modal>
    </>
  );
};
export default TimeField;
