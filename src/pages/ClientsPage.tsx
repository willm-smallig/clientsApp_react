import {
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
  useEffect,
  useState,
} from "react";
import { ClientsService } from "../services/ClientsService";
import { useHistory } from "react-router";
import { IonButton } from "@ionic/react";

export default function ClientsPage() {
  const history = useHistory();
  const [clients, setClients] = useState<any[]>([]);
  const loadClients = async () => {
    const datos = await ClientsService.getClients();
    setClients(datos);
  };
  /* const editar=async()=>{
    history.push('/editar');
  } */

  useEffect(() => {
    loadClients();
  }, []);

  return (
    <div className="container mt-4">
        <h2>Tabla de clientes</h2>
    <table className="table tablebordered">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Correo</th>
          <th>Phone</th>
        </tr>
      </thead>
      <tbody>
        {clients.map((cliente) => (
          <tr key={cliente.id}>
            <td>{cliente.id}</td>
            <td>{cliente.name}</td>
            <td>{cliente.email}</td>
            <td>{cliente.phone}</td>
            <td><IonButton routerLink={`/edit/${cliente.id}`}>Editar</IonButton></td>
          </tr>
        ))}
      </tbody>
      </table>
    </div>
  );
} //Aquí se cierra la function
