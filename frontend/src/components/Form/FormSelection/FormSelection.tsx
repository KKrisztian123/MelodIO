import Button from "@components/Button/Button";
import ButtonContainer from "@components/ButtonContainer/ButtonContainer";
import FullScreenModal from "@components/Modal/FullScreenModal";
import Text from "@components/Text/Text";
import HiddenInput from "@components/Form/input/HiddenInput";
import { Fragment, ReactNode, useRef } from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import {
  isStringifiedArrayNotEmpty,
  isStringifiedArrayNotMaxSize,
} from "@/utils/utils";
import { FormSelectionContext, useFormSelection } from "@hooks/useForm";

const FormSelection = ({
  defaultValues,
  type = "single",
  title,
  id = "artistIds",
  selectorContent,
  selectorContentTitle,
  selectionContent,
  addItemText,
}: {
  id?: string;
  title: string;
  defaultValues?: any[];
  type?: "single" | "multiple";
  selectorContent: ReactNode;
  selectionContent: ReactNode;
  addItemText: string;
  selectorContentTitle: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const {
    addToList,
    removeFromList,
    selectionInfo,
    register,
    open,
    changeOpen,
  } = useFormSelection(id, defaultValues);

  return (
    <FormSelectionContext.Provider
      value={{ addToList, removeFromList, selectionInfo }}
    >
      <Text marginless key={id + "title"}>
        <b>{title}</b>
      </Text>
      {selectionContent}
      {type === "single" && (
        <Fragment key={id + "buttons"}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={
              selectionInfo.length === 0
                ? {
                    opacity: 1,
                    scale: 1,
                    maxHeight:
                      containerRef.current?.getBoundingClientRect().height ||
                      57,
                  }
                : { opacity: 0, scale: 0, maxHeight: 0 }
            }
          >
            <ButtonContainer
              ref={containerRef}
              style={{
                marginBottom: 0,
                marginTop: 0,
                paddingBottom: 5,
                paddingTop: 15,
              }}
              center
            >
              <Button
                icon={faPlus}
                text={addItemText}
                size="small"
                type="secondary"
                onClick={() => changeOpen(true)}
              />
            </ButtonContainer>
          </motion.div>
          <HiddenInput
            key={id + "inputfield"}
            {...register(id, {
              validate: {
                maxSize: (v) =>
                  isStringifiedArrayNotMaxSize(v, 1) || "Maximum 1 adható meg.",
                notEmpty: (v) =>
                  isStringifiedArrayNotEmpty(v) ||
                  "Legalább 1 megadása kötelező.",
              },
            })}
          />
        </Fragment>
      )}
      {type === "multiple" && (
        <HiddenInput
          key={id + "inputfield"}
          {...register(id, {
            validate: {
              notEmpty: (v) =>
                isStringifiedArrayNotEmpty(v) ||
                "Legalább 1 megadása kötelező.",
            },
          })}
        />
      )}
      {type === "multiple" && (
        <ButtonContainer style={{ marginTop: 0, paddingTop: 5 }} center>
          <Button
            icon={faPlus}
            text={addItemText}
            size="small"
            type="secondary"
            onClick={() => changeOpen(true)}
          />
        </ButtonContainer>
      )}
      <FullScreenModal
        title={selectorContentTitle}
        isOpen={open}
        changeOpen={changeOpen}
      >
        {selectorContent}
      </FullScreenModal>
    </FormSelectionContext.Provider>
  );
};
export default FormSelection;
