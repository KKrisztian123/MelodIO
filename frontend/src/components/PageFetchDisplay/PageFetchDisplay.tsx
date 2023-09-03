import ErrorSplash from "@components/ErrorSplash/ErrorSplash";
import CenteredContainer from "@components/Layout/Frame/CenteredContainer/CenteredContainer";
import { Loader } from "@components/Loaders/Loaders";
import { AnimatePresence, motion } from "framer-motion";
import { PropsWithChildren } from "react";

export type PageFetchDisplay = {
  /* Error state. When truthy it displays the error splash. */
  error: any;
  /** Displayed text under the loader.  */
  loaderText: string;
  /** Loading state. */
  loading: boolean;
  /** Text displayed in the error splash screen. */
  errorText: string | false;
};

/** Error and load state handler component for page content fetching. */
const PageFetchDisplay = ({
  loaderText,
  errorText = "Valami hiba történt!",
  loading,
  error,
  children,
}: PropsWithChildren<PageFetchDisplay>) => (
  <>
    <ErrorSplash text={errorText || ""} visible={error} />
    <motion.div
      initial={{ opacity: 0, display: "none" }}
      animate={
        loading
          ? {
              opacity: 1,
              display: "block",
            }
          : {
              opacity: 0,
            }
      }
    >
      <CenteredContainer>
        <Loader text={loaderText} />
      </CenteredContainer>
    </motion.div>
    <AnimatePresence>
      {!error && !loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  </>
);

export default PageFetchDisplay;
