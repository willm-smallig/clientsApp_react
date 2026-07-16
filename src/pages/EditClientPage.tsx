import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { ClientsService } from "../services/ClientsService";
import { } from "../pages/EditClient.css";

export default function EditClientPage() {
  const history = useHistory();
  const [client, setClient] = useState({ name: "", email: "", phone: "", importe: 0 });
  const { id } = useParams<{ id: string }>();
  const update = async () => {
    await ClientsService.updateClient(Number(id), client);
    history.push("/clients");
  };
  /*useEffect(() => {
    loadClient();
  }, []);*/

  useIonViewWillEnter(() => {
loadClient();
console.log('usando effect');
}, []);

  const loadClient = async () => {
    const dato: any = await ClientsService.getClient(Number(id));
    setClient(dato);
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
          <h2>Actualizar</h2>
          <h3>Formulario diseñado con componentes Ionic</h3>

          <IonInput
            value={client.name}
            onIonChange={(e) =>
              setClient({ ...client, name: e.detail.value ?? "" })
            }
          ></IonInput>
          <IonInput
            value={client.email}
            onIonChange={(e) =>
              setClient({ ...client, email: e.detail.value ?? "" })
            }
          ></IonInput>
          <IonInput
            value={client.phone}
            onIonChange={(e) =>
              setClient({ ...client, phone: e.detail.value ?? "" })
            }
          ></IonInput>
          
          <IonInput
            value={client.importe}
            onIonChange={(e) =>
              setClient({ ...client, importe: Number (e.detail.value) ?? 0 })
            }
          ></IonInput>
          <IonButton onClick={update}>Actualizar</IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
}
