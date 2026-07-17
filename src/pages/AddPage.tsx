import { useState } from "react";
import { ClientsService } from "../services/ClientsService";
import { useHistory } from "react-router";
import { toast } from "sonner";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonContent,
} from "@ionic/react";

export default function AddPage() {
  const history = useHistory();
  const [client, setClient] = useState({
    name: "",
    email: "",
    phone: "",
    importe: 0,
  });

  const save = async () => {
    try {
      await ClientsService.addClient(client);
      toast.success("Cliente guardado");
      history.push("/clients", { showToast: true });
    } catch {
      toast.error("Error al guardar el cliente");
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
          <h2>Nuevo cliente</h2>
          <input
            type="text"
            value={client.name}
            placeholder="Nombre"
            onChange={(e) => setClient({ ...client, name: e.target.value })}
          />
          <input
            type="email"
            value={client.email}
            placeholder="Correo electrónico"
            onChange={(e) => setClient({ ...client, email: e.target.value })}
          />
          <input
            type="text"
            value={client.phone}
            placeholder="Teléfono"
            onChange={(e) => setClient({ ...client, phone: e.target.value })}
          />
          <input
            value={client.importe}
            placeholder="Importe"
            onChange={(e) =>
              setClient({ ...client, importe: Number(e.target.value) || 0 })
            }
          />
          <button onClick={save}>Guardar</button>
        </div>
      </IonContent>
    </IonPage>
  );
}
