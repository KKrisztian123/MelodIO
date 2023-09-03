import { useForm, useFormContext } from "react-hook-form";
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
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import useDebounce from "./useDebounce";
import useToggle from "./useToggle";

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

export type SelectionInfo = { id: string; values: any };

export const FormSelectionContext = createContext<
  Partial<ReturnType<typeof useFormSelection>>
>({} as ReturnType<typeof useFormSelection>);

export const useFormSelection = (
  id: string,
  defaultValues?: SelectionInfo[]
) => {
  const { register, setValue, trigger } = useFormContext();
  const [open, changeOpen] = useToggle();
  const [selectionInfo, setSelectionInfo] = useState<SelectionInfo[]>(
    defaultValues || []
  );

  useEffect(() => {
    defaultValues &&
      setValue(
        id,
        JSON.stringify(defaultValues.map((selectionInfo) => selectionInfo.id))
      );
  }, [defaultValues, setValue, id]);

  const removeFromList = useCallback(
    (index: number) => {
      const newValue = [...selectionInfo];
      newValue.splice(index, 1);
      setSelectionInfo(newValue);
      setValue(
        id,
        JSON.stringify(newValue.map((selectionInfo) => selectionInfo.id))
      );
      trigger(id);
    },
    [setValue, id, selectionInfo, trigger]
  );

  const addToList = useCallback(
    (listId: string, values: any) => {
      if (selectionInfo.find((info) => info.id === listId)) return;

      const newValue = [
        ...selectionInfo,
        { id: listId, values } as SelectionInfo,
      ];
      setSelectionInfo(newValue);
      setValue(
        id,
        JSON.stringify(newValue.map((selectionInfo) => selectionInfo.id))
      );
      changeOpen(false);
      trigger(id);
    },
    [selectionInfo, setValue, id, changeOpen, trigger]
  );

  return {
    addToList,
    removeFromList,
    open,
    changeOpen,
    close,
    register,
    selectionInfo,
  };
};

export const useFormSelectionContext = () => {
  return useContext(FormSelectionContext);
};
