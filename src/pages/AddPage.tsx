import { useState } from "react";
import { ClientsService } from "../services/ClientsService";
import { useHistory } from "react-router"; //react-router-dom 5
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonContent,
} from "@ionic/react";
//import { useNavigate } from 'react-router-dom';

export default function AddPage() {
  //console.log("nuevo cliente");
  //const navigate =useNavigate();//React Router 6
  const history = useHistory();
  const [client, setClient] = useState({ name: "", email: "", phone: "", importe: 0 });

  const save = async () => {
    await ClientsService.addClient(client);
    //NavigateEvent('/clients');
    history.push("/clients");
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
          <h2>Nuevo cliente</h2>
          <input
            onChange={(e) => setClient({ ...client, name: e.target.value })}
          />
          <input
            onChange={(e) => setClient({ ...client, email: e.target.value })}
          />
          <input
            onChange={(e) => setClient({ ...client, phone: e.target.value })}
          />
          <button onClick={save}>Guardar</button>
        </div>
      </IonContent>
    </IonPage>
  );
}
