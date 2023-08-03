import { IonContent } from "@ionic/react";
import { PropsWithChildren } from "react";
import "./PageContent.css";

export type PageContentProps = {
  /** If `true` it pushes the content down with the headers height.  */
  hasExternalHeader?: boolean;
}

/** Main Content container for every page */
const PageContent = ({ children, hasExternalHeader = false }: PropsWithChildren<PageContentProps>) => {
  return (
    <IonContent fullscreen className="page-content-container">
      {hasExternalHeader && <div className="header-placeholder"></div>}
      <div className="page-content-padding">{children}</div>
    </IonContent>
  );
};
export default PageContent;
