import { useState } from "react";
import { useHistory } from "react-router";
import { useAuth } from "../services/AuthContext";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonNote,
  IonPage,
  IonTitle,
  IonToolbar,
  IonSpinner,
} from "@ionic/react";

export default function LoginPage() {
  const history = useHistory();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError(null);
    setLoading(true);
    try {
      await login(email, password);
      history.push("/clients");
    } catch {
      setError("Credenciales incorrectas. Comprueba tu email y contraseña.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Iniciar sesión</IonTitle>
          <IonButtons slot="end">
            <IonButton routerLink="/clients">Ver clientes</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Iniciar sesión</IonTitle>
          </IonToolbar>
        </IonHeader>

        <div className="container mt-4" style={{ maxWidth: 480 }}>
          <h2>Acceso al sistema</h2>

          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          <IonItem>
            <IonLabel position="stacked">Correo electrónico</IonLabel>
            <IonInput
              type="email"
              value={email}
              placeholder="tu@email.com"
              onIonChange={(e) => setEmail(e.detail.value ?? "")}
            />
          </IonItem>

          <IonItem className="mt-2">
            <IonLabel position="stacked">Contraseña</IonLabel>
            <IonInput
              type="password"
              value={password}
              placeholder="••••••••"
              // detecta cambios y actualiza estado
              onIonChange={(e) => setPassword(e.detail.value ?? "")}
            />
          </IonItem>

          <div className="mt-3">
            <IonButton
              expand="block"
              onClick={handleLogin}
              // verifica la condición para habilitar/deshabilitar
              disabled={loading || !email || !password}
            >
              {loading ? <IonSpinner name="crescent" /> : "Entrar"}
            </IonButton>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
}