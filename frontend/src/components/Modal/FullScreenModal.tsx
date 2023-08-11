import {
  type Target,
  type VariantLabels,
  motion,
  type TargetAndTransition,
  type AnimationControls,
  AnimatePresence,
} from "framer-motion";
import styles from "./FullScreenModal.module.css";
import {
  PropsWithChildren,
  ReactElement,
  cloneElement,
  isValidElement,
} from "react";
import { type ModalProps } from "./Modal";
import useToggle from "../../hooks/useToggle";
import Header from "../Layout/AppLayout/Header/Header";
import { ButtonProps, IconButton } from "../Button/Button";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import ButtonContainer from "../ButtonContainer/ButtonContainer";
import { createPortal } from "react-dom";

const AnimationConfig: {
  initial: boolean | Target | VariantLabels;
  animate:
    | boolean
    | VariantLabels
    | TargetAndTransition
    | AnimationControls
    | undefined;
  exit: TargetAndTransition | VariantLabels;
} = {
  initial: {
    opacity: 0,
    y: "100%",
  },
  animate: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: "100%",
  },
};

export type FullScreenModal = ModalProps & {
  /** If `true` no close button is displayed in the modal. */
  noCloseButton?: boolean;
};

/** A modal that occupies the whole screen. */
const FullScreenModal = ({
  isOpen,
  changeOpen: changeOpenProp,
  children,
  title,
  closeComponent,
  triggerComponent,
  noCloseButton = false,
}: PropsWithChildren<FullScreenModal>) => {
  const [open, changeOpen] = useToggle();
  const value = typeof isOpen !== "undefined" ? isOpen : open;
  const change = changeOpenProp || changeOpen;
  return (
    <>
      {isValidElement(triggerComponent) &&
        cloneElement(triggerComponent as ReactElement<ButtonProps>, {
          onClick: () => change(true),
        })}
      {createPortal(
        <AnimatePresence>
          {value && (
            <motion.div
              className={styles.fullScreenModal}
              initial={AnimationConfig.initial}
              animate={AnimationConfig.animate}
              exit={AnimationConfig.exit}
              transition={{ duration: 0.4, type: "spring" }}
            >
              <Header
                transparent
                leftOrnament={
                  !noCloseButton && (
                    <IconButton
                      label="Bezár"
                      icon={faXmark}
                      type="tertiary"
                      size="extraLarge"
                      onClick={() => change(false)}
                    />
                  )
                }
              >
                {title}
              </Header>
              <div>
                {children}
                <ButtonContainer>
                  {isValidElement(closeComponent) &&
                    cloneElement(closeComponent as ReactElement<ButtonProps>, {
                      onClick: () => {
                        change(false);
                      },
                    })}
                </ButtonContainer>
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
};

export default FullScreenModal;
