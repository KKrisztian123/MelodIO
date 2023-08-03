import { AnimatePresence, motion } from "framer-motion";
import styles from "./Loaders.module.css";
import { createPortal } from "react-dom";

export type LoaderProps = {
  /** Displays text under the loader. */
  text?: string;
  /** Toggles between a solid and transparent background for the loader. */
  withBackground?: boolean;
};

type LoaderTemplateProps = LoaderProps & {
  harmonyCount?: number;
  className?: string;
};

type State<T> = T & {
  /** Current loading state. */
  loading?: boolean;
};

const LoaderTemplate = ({
  text,
  withBackground = false,
  harmonyCount = 7,
  className,
}: LoaderTemplateProps) => {
  return (
    <div
      className={
        withBackground
          ? `${styles.loaderWrapper} ${styles.withBackground} ${className}`
          : `${styles.loaderWrapper} ${className}`
      }
    >
      <div className={styles.loader}>
        {Array.from(Array(harmonyCount).keys()).map((value, key) => (
          <div key={key}></div>
        ))}
      </div>
      {text && <p>{text}</p>}
    </div>
  );
};

export type SmallLoaderProps = Omit<LoaderProps, "text">;

/** Animated small loader without progress display. */
export const SmallLoader = ({ withBackground }: SmallLoaderProps) => (
  <LoaderTemplate
    harmonyCount={5}
    withBackground={withBackground}
    className={styles.smallLoader}
  />
);

/** Animated loader without progress display. */
export const Loader = ({ text = "Harmonizálás", ...rest }: LoaderProps) => (
  <LoaderTemplate {...rest} text={text} />
);

/** Animated Fullscreen loader without progress display. */
export const FullScreenLoader = ({
  loading = true,
  withBackground = true,
  ...rest
}: State<LoaderProps>) => {
  return createPortal(
    <AnimatePresence>
      {loading && (
        <>
          <motion.div
            className={styles.loaderBackground}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Loader {...rest} withBackground={withBackground} />
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
};
