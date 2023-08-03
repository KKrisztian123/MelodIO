import { faHeart, faHome, faSearch } from "@fortawesome/free-solid-svg-icons";
import BottomNavigation, {
  BottomNavigationButton,
} from "./BottomNavigation/BottomNavigation";
import { PropsWithChildren } from "react";
import Header from "./Header/Header";
import { useMainLocation } from "../../../hooks/locationHooks";
import routes from "../../../routes";
import Title from "./Title/Title";
import { Link } from "react-router-dom";
import ProfileImage from "../../ProfileImage/ProfileImage";
import BackButton from "../BackButton";
import tempImage from "@assets/photo-1544005313-94ddf0286df2.webp";
import { useProfile } from "@features/Profile";
/** Main App Layout */
const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div>
      <LayoutHeader />
      {children}
      <BottomNavigation>
        <BottomNavigationButton
          to={"/explore/"}
          icon={faHome}
          label={"Felfedezés"}
        />
        <BottomNavigationButton
          to={"/search/"}
          icon={faSearch}
          label={"Keresés"}
        />
        <BottomNavigationButton
          to={"/playlists/"}
          icon={faHeart}
          label={"Lejátszási listák"}
        />
      </BottomNavigation>
    </div>
  );
};
export default Layout;

/** Main layout header */
const LayoutHeader = () => {
  const location = useMainLocation();
  const profile = useProfile();
  const route = routes.find(
    (route) => route.path.replaceAll("/", "") === location.replaceAll("/", "")
  );

  return (
    <>
      {!route?.headerProps?.noHeader && (
        <Header
          transparent={route?.headerProps?.transparent}
          leftOrnament={route?.headerProps?.showBackButton && <BackButton />}
          rightOrnament={
            !route?.headerProps?.hideProfileImage && (
              <Link to={"/settings/"}>
                <ProfileImage size="small" name="asd" image={profile.image} />
              </Link>
            )
          }
        >
          <Title title={route?.title} letterKeys={route?.path} />
        </Header>
      )}
    </>
  );
};
