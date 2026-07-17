import { Toaster } from "./components/ui/sonner";
import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Home from "./pages/Home";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
/*import "@ionic/react/css/normalize.css";*/
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import "@ionic/react/css/palettes/dark.system.css";

/* Theme variables */
import "./theme/variables.css";

/*importar bootstrap */
import "bootstrap/dist/css/bootstrap.min.css";

import ClientsPage from "./pages/ClientsPage";
import AddPage from "./pages/AddPage";
import EditClientPage from "./pages/EditClientPage";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";

setupIonicReact();

const App: React.FC = () => (
  <AuthProvider>
    <IonApp>
  <Toaster position="top-right" richColors />
      <IonReactRouter>
        <IonRouterOutlet>
          {/* Rutas públicas */}
          <Route exact path="/home">
            <Home />
          </Route>
          <Route exact path="/clients">
            <ClientsPage />
          </Route>
          <Route exact path="/login">
            <LoginPage />
          </Route>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>

          {/* Rutas protegidas: solo accesibles con sesión activa */}
          <ProtectedRoute exact path="/nuevo" component={AddPage} />
          <ProtectedRoute exact path="/edit/:id" component={EditClientPage} />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  </AuthProvider>
)
export default App;
