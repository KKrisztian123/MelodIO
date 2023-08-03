import { IonPage } from "@ionic/react";
import ProfilePage from "../../Profile/routes/Profile";
import PasswordChangePage from "./PasswordChange";
import EqualizerPage from "./Equalizer";
import EndpointPage from "./Endpoint";
import AuthenticatedRoute from "@components/Layout/Routing/AuthenticatedRoute";
import Routes from "@components/Layout/Routing/RouteProvider";
import PageContent from "@components/Layout/Frame/PageContent/PageContent";
import Content from "@components/Layout/Frame/ContentContainer/Content";
import AccountInformation from "@components/AccountInformation/AccountInformation";
import TextBox, { LinkTextBox } from "@components/TextBox/TextBox";
import { useProfile } from "@features/Profile";

const SettingsPage: React.FC = () => {
  return (
    <Routes mode="sync">
      <AuthenticatedRoute
        path={"/settings/"}
        type="horizontalSlideParent"
        exact
        component={Settings}
      />
      <AuthenticatedRoute
        path={"/settings/profile"}
        type="horizontalSlide"
        component={ProfilePage}
      />
      <AuthenticatedRoute
        path={"/settings/passwordchange"}
        type="horizontalSlide"
        component={PasswordChangePage}
      />
      <AuthenticatedRoute
        path={"/settings/equalizer"}
        type="horizontalSlide"
        component={EqualizerPage}
      />
      <AuthenticatedRoute
        path={"/settings/endpoint"}
        type="horizontalSlide"
        component={EndpointPage}
      />
    </Routes>
  );
};
const Settings: React.FC = () => {
  const profile = useProfile();
  return (
    <IonPage>
      <PageContent hasExternalHeader>
        <Content>
          <AccountInformation
            userName={profile.name}
            userEmail={profile.email}
            image={profile.image}
          />
        </Content>
        <Content>
          <TextBox title="Adminisztrátor" />
          <LinkTextBox
            title="Előadók"
            description="Előadók létrehozása, szerkesztése és törlése."
            to="./artists"
          />
          <LinkTextBox
            title="Albumok és dalok"
            description="Albumok és dalok létrehozása, szerkesztése és törlése."
            to="./albums"
          />
          <TextBox title="Hang"/>
          <LinkTextBox
            title="Hangszínszabályzó"
            description="A hangszínszabályzó beállítása."
            to="./equalizer"
          />
          <LinkTextBox
            title="Lejátszás"
            description="A lejátszó beállításai."
            to="./player"
          />
          <TextBox title="Felhasználó"/>
          <LinkTextBox
            title="Profil Szerkesztése"
            description="Felhasználói profil adatainak szerkesztése."
            to="./profile"
          />
          <LinkTextBox
            title="Jelszóváltás"
            description="A felhasználó jelszavának megváltoztatása."
            to="./passwordchange"
          />
          <LinkTextBox
            title="Végpont Beállítása"
            description="Az alkalmazás szerver végpontjának beállítása."
            to="./endpoint"
          />
          <LinkTextBox
            title="Kijelentkezés"
            description={`Be vagy jelentkezve mint: ${"Kucsera Krisztián"}.`}
            to="/logout"
          />
        </Content>
      </PageContent>
    </IonPage>
  );
};

export default SettingsPage;
