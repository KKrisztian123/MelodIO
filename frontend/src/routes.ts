import type { FC } from "react";
import ExplorePage from "./pages/Explore";
import { PlaylistsPage, LikedSongsPage } from "@features/SongGroups";
import SearchPage from "./pages/Search";
import { HeaderProps } from "./components/Layout/AppLayout/Header/Header";
import { SettingsPage } from "@features/Settings/Index";
import LoginPage from "./pages/Login";
import AuthenticatedRoute from "@components/Layout/Routing/AuthenticatedRoute";
import AnimatedRoute, {
  AnimatedRouteProps,
} from "@components/Layout/Routing/AnimatedRoute";
import LogoutPage from "./pages/Logout";
import { AlbumsPage, AlbumPage } from "@features/SongGroups";

/** Main Application Routes */
export default [
  {
    path: "/",
    component: ExplorePage,
    title: "Felfedezés",
    routeComponent: AuthenticatedRoute,
    props: {
      exact: true,
    },
  },
  {
    path: "/explore/",
    component: ExplorePage,
    routeComponent: AuthenticatedRoute,
    title: "Felfedezés",
    props: {
      exact: true,
    },
  },
  {
    path: "/albums/",
    component: AlbumsPage,
    routeComponent: AuthenticatedRoute,
    title: "Albumok",
    props: {
      exact: true,
    },
    headerProps: {
      transparent: true,
    },
  },
  {
    path: "/albums/:albumId",
    component: AlbumPage,
    routeComponent: AuthenticatedRoute,
    title: "Album",
    props: {
      style: { zIndex: 1 },
    },
  },
  {
    path: "/search/",
    component: SearchPage,
    routeComponent: AuthenticatedRoute,
    title: "Keresés",
  },
  {
    path: "/settings/",
    component: SettingsPage,
    routeComponent: AuthenticatedRoute,
    title: "Beállítások",
    headerProps: {
      showBackButton: true,
      hideProfileImage: true,
    },
  },
  {
    path: "/playlists/",
    component: PlaylistsPage,
    routeComponent: AuthenticatedRoute,
    props: {
      exact: true,
    },
    headerProps: {
      transparent: true,
    },
    title: "Lejátszási Listák",
  },
  {
    path: "/playlists/liked-songs",
    component: LikedSongsPage,
    routeComponent: AuthenticatedRoute,
    title: "Kedvelt Dalok",
    props: {
      style: { zIndex: 1 },
    },
  },
  {
    path: "/login/",
    component: LoginPage,
    routeComponent: AnimatedRoute,
    title: "Bejelentkezés",
    headerProps: {
      hideProfileImage: true,
      transparent: true,
      noHeader: true,
    },
  },
  {
    path: "/logout/",
    component: LogoutPage,
    routeComponent: AnimatedRoute,
    title: "Kijelentkezés",
    headerProps: {
      hideProfileImage: true,
      transparent: true,
      noHeader: true,
    },
  },
  {
    path: "*",
    component: ExplorePage,
    routeComponent: AuthenticatedRoute,
    title: "Felfedezés",
  },
] as {
  path: string;
  component: FC;
  title: string;
  routeComponent: FC<AnimatedRouteProps>;
  props?: { [key: string]: boolean | string | number | object };
  headerProps?: Omit<
    HeaderProps,
    "leftOrnament" | "rightOrnament" | "children"
  > & {
    hideProfileImage?: boolean;
    showBackButton?: boolean;
    noHeader?: boolean;
  };
}[];
