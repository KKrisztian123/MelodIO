import CenteredTextContainer from "@components/CenteredTextContainer";
import PageContent from "@components/Layout/Frame/PageContent/PageContent";
import { FullScreenLoader } from "@components/Loaders/Loaders";
import { useLogout, useSessionValidation } from "@features/Auth/Index";
import { IonPage } from "@ionic/react";
import { useEffect, type FC } from "react";
import { Redirect } from "react-router";

const LogoutPage: FC = () => {
  const { logout, loading } = useLogout();
  const isValid = useSessionValidation();

  useEffect(() => {
    isValid && logout();
  }, [logout, isValid]);

  return isValid ? (
    <IonPage>
      <PageContent hasExternalHeader>
        <FullScreenLoader
          text="Kijelentkezés"
          loading={loading}
          withBackground
        />
        {!loading && <CenteredTextContainer title="Valami hiba történt!"/>}
      </PageContent>
    </IonPage>
  ) : (
    <Redirect to="/login" />
  );
};
export default LogoutPage;
