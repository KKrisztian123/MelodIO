import { IonPage } from "@ionic/react";
import ProfilePage from "../../Profile/routes/Profile";
import PasswordChangePage from "./PasswordChange";
import EndpointPage from "./Endpoint";
import AuthenticatedRoute from "@components/Layout/Routing/AuthenticatedRoute";
import Routes from "@components/Layout/Routing/RouteProvider";
import PageContent from "@components/Layout/Frame/PageContent/PageContent";
import Content from "@components/Layout/Frame/ContentContainer/Content";
import AccountInformation from "@components/AccountInformation/AccountInformation";
import TextBox, { LinkTextBox } from "@components/TextBox/TextBox";
import { useCurrentProfile } from "@features/Profile";
import NewUserPage from "@features/Admin/routes/User/newUser";
import {
  AlbumsAdminPage,
  ArtistsAdminPage,
  SongsAdminPage,
} from "@features/Admin";
import { useSession } from "@features/Auth/Index";

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
        path={"/settings/new-user"}
        type="horizontalSlide"
        adminRoute
        component={NewUserPage}
      />
      <AuthenticatedRoute
        path={"/settings/artists/"}
        type="horizontalSlide"
        adminRoute
        component={ArtistsAdminPage}
      />
      <AuthenticatedRoute
        path={"/settings/albums/"}
        type="horizontalSlide"
        adminRoute
        component={AlbumsAdminPage}
      />
      <AuthenticatedRoute
        path={"/settings/songs/"}
        type="horizontalSlide"
        adminRoute
        component={SongsAdminPage}
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
      {/** A web audio API-s reworknél kerül be. */}
      {/* <AuthenticatedRoute
        path={"/settings/equalizer"}
        type="horizontalSlide"
        component={EqualizerPage}
      /> */}
      <AuthenticatedRoute
        path={"/settings/endpoint"}
        type="horizontalSlide"
        component={EndpointPage}
      />
    </Routes>
  );
};
const Settings: React.FC = () => {
  const profile = useCurrentProfile();
  const { authLevel } = useSession();
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
          {authLevel === "admin" && (
            <>
              <TextBox title="Adminisztrátor" />
              <LinkTextBox
                title="Profil létrehozása"
                description="Felhasználói profil létrehozása."
                to="./new-user"
              />
              <LinkTextBox
                title="Előadók"
                description="Előadók létrehozása és szerkesztése."
                to="./artists"
              />
              <LinkTextBox
                title="Albumok"
                description="Albumok létrehozása és szerkesztése."
                to="./albums"
              />
              <LinkTextBox
                title="Dalok"
                description="Dalok létrehozása és szerkesztése."
                to="./songs"
              />
            </>
          )}

          {/* <TextBox title="Hang" />
          <LinkTextBox
            title="Hangszínszabályzó"
            description="A hangszínszabályzó beállítása."
            to="./equalizer"
          />
          <LinkTextBox
            title="Lejátszás"
            description="A lejátszó beállításai."
            to="./player"
          /> */}
          <TextBox title="Felhasználó" />
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
            description={`Be vagy jelentkezve mint: ${profile.name}.`}
            to="/logout"
          />
        </Content>
      </PageContent>
    </IonPage>
  );
};

export default SettingsPage;
