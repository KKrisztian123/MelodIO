import { IonApp, setupIonicReact } from "@ionic/react";
import Routes from "./components/Layout/Routing/RouteProvider";
import Layout from "./components/Layout/AppLayout/Layout";
import routes from "./routes";
import { useInitSession } from "@features/Auth/Index";
import { EndpointManager } from "@features/ServerEndpoint";
import { ProfileManager } from "@features/Profile";
import { NetworkManager } from "@features/Network";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import "./theme/global.css";


setupIonicReact({
  mode: "ios",
});

const App: React.FC = () => {
  useInitSession();
  return (
    <IonApp>
      <Layout>
        <Routes>
          {routes.map(
            (
              { routeComponent: Route, path, component: Component, props },
              id
            ) => (
              <Route
                key={path + id}
                {...props}
                path={path}
                component={Component}
              />
            )
          )}
        </Routes>
      </Layout>
      <ProfileManager />
      <EndpointManager />
      <NetworkManager/>
    </IonApp>
  );
};

export default App;
