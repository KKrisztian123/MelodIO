import {
  cloneElement,
  isValidElement,
  type ReactElement,
  type PropsWithChildren,
  type ReactNode,
  useEffect,
} from "react";
import styles from "./Modal.module.css";
import useToggle from "../../hooks/useToggle";
import ButtonContainer from "../ButtonContainer/ButtonContainer";
import type { ButtonProps } from "../Button/Button";
import { H3 } from "../Titles/Titles";
import {
  AnimatePresence,
  type PanInfo,
  motion,
  useAnimation,
} from "framer-motion";
import { createPortal } from "react-dom";

type Modal = {
  /** Title of the modal content */
  title: string;
  /** Component that triggers the modal closing. */
  closeComponent?: ReactNode;
};

type Uncontrolled = {
  /** Component that triggers the modal opening. */
  triggerComponent: ReactNode;
  changeOpen?: never;
  isOpen?: never;
};

type Controlled = {
  /** Modal state. */
  isOpen: boolean;
  /** Callback for changing modal state. */
  changeOpen: (v: boolean) => void;
  /** Component that triggers the modal opening. */
  triggerComponent?: ReactNode;
};

type ControlledModal = Modal & Controlled;

type UncontrolledModal = Modal & Uncontrolled;

export type ModalProps = ControlledModal | UncontrolledModal;

/** Animation configuration for different modal states */
const animationVariants = {
  visible: { translateY: 0, translateX: "-50%" },
  hidden: { translateY: "100%", translateX: "-50%" },
};

/** A swipeable modal component. This component can be both controlled and uncontrolled */
const Modal = ({
  isOpen,
  changeOpen: changeOpenProp,
  children,
  title,
  closeComponent,
  triggerComponent,
}: PropsWithChildren<ModalProps>) => {
  const [open, changeOpen] = useToggle();
  const value = typeof isOpen !== "undefined" ? isOpen : open;
  const change = changeOpenProp || changeOpen;
  const animation = useAnimation();

  const endDrag = (event: any, info: PanInfo) => {
    const shouldClose =
      info.velocity.y > 25 || (info.velocity.y >= 0 && info.offset.y > 40);
    if (shouldClose) {
      change(false);
    } else if (info.offset.y > 0) {
      animation.start({ y: 0 });
    }
  };

  useEffect(() => {
    if (value) {
      animation.start("visible");
    }
  }, [value, animation]);

  return (
    <>
      {isValidElement(triggerComponent) &&
        cloneElement(triggerComponent as ReactElement<ButtonProps>, {
          onClick: () => change(true),
        })}
      {createPortal(
        <>
          <AnimatePresence>
            {value && (
              <>
                <motion.div
                  onClick={() => change(false)}
                  tabIndex={0}
                  className={styles.modalBackdrop}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.2 }}
                  exit={{ opacity: 0 }}
                />
                <motion.div
                  className={styles.modal}
                  drag={"y"}
                  role="dialog"
                  ref={(ref) => ref?.focus()}
                  aria-labelledby={title}
                  initial="hidden"
                  animate={animation}
                  variants={animationVariants}
                  exit="hidden"
                  transition={{ duration: 0.4, type: "spring" }}
                  dragConstraints={{ top: 0 }}
                  dragElastic={0.1}
                  dragMomentum={false}
                  onDragEnd={endDrag}
                >
                  <div className={styles.modalPin}></div>
                  <H3 centered>{title}</H3>
                  <div className={styles.modalContent}>
                    {children}
                    {isValidElement(closeComponent) && (
                      <ButtonContainer>
                        {cloneElement(
                          closeComponent as ReactElement<ButtonProps>,
                          {
                            onClick: () => {
                              change(false);
                            },
                          }
                        )}
                      </ButtonContainer>
                    )}
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </>,
        document.body
      )}
    </>
  );
};

export default Modal;
