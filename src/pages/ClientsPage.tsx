import { useEffect, useState } from "react";
import { ClientsService } from "../services/ClientsService";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";

export default function ClientsPage() {
  const [clients, setClients] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const currentClients = clients.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(clients.length / recordsPerPage);
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const loadClients = async () => {
    const datos = await ClientsService.getClients();
    setClients(datos);
  };

  const eliminar = async (id: number) => {
    const ok = confirm("¿Deseas eliminar el registro?");
    if (ok) {
      await ClientsService.deleteClient(id);
      loadClients();
    }
  };

  /*  useEffect(() => {
    loadClients();
  }, []); */

  useIonViewWillEnter(() => {
    loadClients();
    console.log("usando effect");
  }, []);

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
        <div className="container mt-4">
          <h2>Tabla de clientes</h2>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Phone</th>
                <th>Editar</th>
                <th>Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {currentClients.map((cliente) => (
                <tr key={cliente.id}>
                  <td>{cliente.id}</td>
                  <td>{cliente.name}</td>
                  <td>{cliente.email}</td>
                  <td>{cliente.phone}</td>
                  <td>
                    <IonButton routerLink={`/edit/${cliente.id}`}>
                      Editar
                    </IonButton>
                  </td>
                  <td>
                    <IonButton onClick={() => eliminar(cliente.id)}>
                      Eliminar
                    </IonButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="d-flex justify-content-center mt-3">
            {pageNumbers.map((page) => (
              <button
                key={page}
                className={
                  page === currentPage
                    ? "btn btn-primary mx-1"
                    : "btn btn-outline-primary mx-1"
                }
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
}
