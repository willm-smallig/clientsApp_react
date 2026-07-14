import { useEffect, useState } from "react";
import { ClientsService } from "../services/ClientsService";
import { IonButton } from "@ionic/react";

export default function ClientsPage() {
  const [clients, setClients] = useState<any[]>([]);

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

  useEffect(() => {
    loadClients();
  }, []);

  return (
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
          {clients.map((cliente) => (
            <tr key={cliente.id}>
              <td>{cliente.id}</td>
              <td>{cliente.name}</td>
              <td>{cliente.email}</td>
              <td>{cliente.phone}</td>
              <td>
                <IonButton routerLink={`/edit/${cliente.id}`}>Editar</IonButton>
              </td>
              <td>
                <IonButton onClick={() => eliminar(cliente.id)}>Eliminar</IonButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
