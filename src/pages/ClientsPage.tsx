import { Geolocation } from "@capacitor/geolocation";
import { useEffect, useState } from "react";
import { ClientsService } from "../services/ClientsService";
import { useAuth } from "../services/AuthContext";
import {} from "react";
import {} from "../pages/Clients.css";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToast,
  IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";

export default function ClientsPage() {
  const { isAuthenticated, logout } = useAuth();

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
    // Comprueba la seguridad y aunque el botón esté oculto, verifica el auth
    if (!isAuthenticated) {
      alert("Debes iniciar sesión para eliminar un cliente.");
      return;
    }
    const ok = confirm("¿Deseas eliminar el registro?");
    if (ok) {
      await ClientsService.deleteClient(id);
      loadClients();
    }
  };
  const [showToast, setShowToast] = useState(false);

  const getLocation = async () => {
    const position = await Geolocation.getCurrentPosition();
    console.log(position.coords.latitude);
    console.log(position.coords.longitude);
  };

  useIonViewWillEnter(() => {
    loadClients();
    getLocation();
  }, []);

  const handleLogout = async () => {
    await logout();
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Clientes</IonTitle>
          <IonButtons slot="end">
            <IonButton routerLink="/">Inicio</IonButton>
            <IonButton routerLink="/home">Home</IonButton>
            <IonButton routerLink="/clients">Ver clientes</IonButton>

            {/* Solo visible si está autenticado */}
            {isAuthenticated && (
              <IonButton routerLink="/nuevo">Añadir cliente</IonButton>
            )}

            {/* Botón de sesión: login u logout según estado */}
            {isAuthenticated ? ( // Ternario (expresión - retorna un valor)
              // Si está autenticado (true)
              <IonButton onClick={handleLogout} color="danger">
                Cerrar sesión
              </IonButton>
            ) : (
              // Si NO está autenticado (false)
              <IonButton routerLink="/login" color="primary">
                Iniciar sesión
              </IonButton>
            )}
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Clientes</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div className="container-fluid">
          <IonToast
            isOpen={showToast}
            onDidDismiss={() => setShowToast(false)}
            message="Cliente guardado"
            duration={2000}
          />
          <IonButton onClick={() => setShowToast(false)} />
          <h2>Tabla de clientes</h2>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Phone</th>
                <th>Facturación</th>
                {/* Columnas de acción solo visibles si está autenticado */}
                {isAuthenticated && <th>Editar</th>}
                {isAuthenticated && <th>Eliminar</th>}
              </tr>
            </thead>
            <tbody>
              {currentClients.map((cliente) => (
                <tr key={cliente.id}>
                  <td>{cliente.id}</td>
                  <td>{cliente.name}</td>
                  <td>{cliente.email}</td>
                  <td>{cliente.phone}</td>
                  <td>{cliente.importe}</td>
                  {isAuthenticated && (
                    <td>
                      <IonButton className="mibtn" routerLink={`/edit/${cliente.id}`}>
                        Editar
                      </IonButton>
                    </td>
                  )}
                  {isAuthenticated && (
                    <td>
                      <IonButton className="mibtn" onClick={() => eliminar(cliente.id)}>
                        Eliminar
                      </IonButton>
                    </td>
                  )}
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
        /
      </IonContent>
    </IonPage>
  );
}
