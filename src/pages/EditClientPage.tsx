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
import { useState } from "react";
import { useHistory, useParams } from "react-router";
import { ClientsService } from "../services/ClientsService";
import "./EditClient.css";

interface ClientData {
  name: string;
  email: string;
  phone: string;
  importe: number;
}

export default function EditClientPage() {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();

  const [client, setClient] = useState<ClientData>({
    name: "",
    email: "",
    phone: "",
    importe: 0,
  });

  const loadClient = async () => {
    const dato = (await ClientsService.getClient(Number(id))) as ClientData;
    setClient(dato);
  };

  const update = async () => {
    await ClientsService.updateClient(Number(id), client);
    history.push("/clients", { showToast: true });
  };

  useIonViewWillEnter(() => {
    loadClient();
    console.log("usando effect");
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Editar cliente</IonTitle>
          <IonButtons slot="end">
            <IonButton routerLink="/">Inicio</IonButton>
            <IonButton routerLink="/home">Home</IonButton>
            <IonButton routerLink="/clients">Ver clientes</IonButton>
            <IonButton routerLink="/nuevo">Añadir cliente</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <div className="edit-page">
          <div className="edit-card">
            <h2 className="edit-title">Actualizar</h2>
            <p className="edit-subtitle">
              Modifica los datos del cliente.
            </p>

            <div className="edit-form">
              <div className="form-group">
                <label className="form-label">Nombre</label>
                <IonInput
                  className="form-input"
                  type="text"
                  placeholder="Nombre del cliente"
                  value={client.name}
                  onIonChange={(e) =>
                    setClient({ ...client, name: e.detail.value ?? "" })
                  }
                />
              </div>

              <div className="form-group">
                <label className="form-label">Correo electrónico</label>
                <IonInput
                  className="form-input"
                  type="email"
                  placeholder="correo@ejemplo.com"
                  value={client.email}
                  onIonChange={(e) =>
                    setClient({ ...client, email: e.detail.value ?? "" })
                  }
                />
              </div>

              <div className="form-group">
                <label className="form-label">Teléfono</label>
                <IonInput
                  className="form-input"
                  type="tel"
                  placeholder="600123123"
                  value={client.phone}
                  onIonChange={(e) =>
                    setClient({ ...client, phone: e.detail.value ?? "" })
                  }
                />
              </div>

              <div className="form-group">
                <label className="form-label">Importe</label>
                <IonInput
                  className="form-input"
                  placeholder="0"
                  value={client.importe}
                  onIonChange={(e) =>
                    setClient({
                      ...client,
                      importe: Number(e.detail.value || 0),
                    })
                  }
                />
              </div>

              <IonButton className="edit-button" expand="block" onClick={update}>
                Actualizar
              </IonButton>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
}