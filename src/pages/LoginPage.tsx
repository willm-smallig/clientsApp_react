import { useState } from "react";
import { useHistory } from "react-router";
import { AuthService } from "../services/AuthService";
import { IonButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";

export default function LoginPage() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      await AuthService.login(email, password);
      history.push("/clients");
    } catch {
      alert("Credenciales incorrectas");
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Blank</IonTitle>
          <IonButtons slot="end">
            <IonButton routerLink="/">Inicio</IonButton>
            <IonButton routerLink="/home">Home</IonButton>
            <IonButton routerLink="/clients">Ver clientes</IonButton>
            <IonButton routerLink="/nuevo">Añadir cliente</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div>
          <h2>Iniciar sesión</h2>
          <input value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button onClick={login}>Guardar</button>
        </div>
      </IonContent>
    </IonPage>
  );
}


