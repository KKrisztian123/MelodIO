import { IonContent } from "@ionic/react";
import { PropsWithChildren } from "react";
import "./PageContent.css";
import useThrottle from "@hooks/useThrottle";
import { useDispatch } from "react-redux";
import { setScroll } from "@/appSlice";

export type PageContentProps = {
  /** If `true` it pushes the content down with the headers height.  */
  hasExternalHeader?: boolean;
  /** Removes all padding from the sides when `true`. */
  fullWidth?: boolean;
};

/** Main Content container for every page */
const PageContent = ({
  children,
  hasExternalHeader = false,
  fullWidth = false,
}: PropsWithChildren<PageContentProps>) => {
  const dispatch = useDispatch();
  const throttle = useThrottle();
  const changeScroll = (v: any) => {
    dispatch(setScroll(v.detail.scrollTop > 50));
  };
  const throttledScoll = (v: any) => throttle(changeScroll, v);

  return (
    <IonContent
      fullscreen
      scrollEvents={true}
      onIonScroll={throttledScoll}
      className={
        fullWidth
          ? "page-content-container full-width"
          : "page-content-container"
      }
    >
      {hasExternalHeader && <div className="header-placeholder"></div>}
      <div className="page-content-padding">{children}</div>
    </IonContent>
  );
};
export default PageContent;
