import { IonButton, IonInput } from "@ionic/react";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { ClientsService } from "../services/ClientsService";

export default function EditClientPage(){

    const history = useHistory();
    const[client,setClient]=useState({ name:"", email:"", phone:""});
    const {id}=useParams<{id: string}>();
    const update=async()=>{
        await ClientsService.updateClient(Number(id), client);
        history.push("/clients");
    }
    useEffect(() => {
        loadClient();
    }, []);

    const loadClient= async () => {
        const dato:any = await ClientsService.getClient(Number(id));
        setClient(dato);
    }

    return(
        <div>
            <h2>Actualizar</h2>
            <h3>Formulario diseñado con componentes Ionic</h3>

            <IonInput value={client.name} onIonChange={(e) => setClient({ ...client, name: e.detail.value?? ""})}></IonInput>
            <IonInput value={client.email} onIonChange={(e) =>setClient({ ...client, email: e.detail.value?? ""})}></IonInput>
            <IonInput value={client.phone} onIonChange={(e) =>setClient({ ...client, phone: e.detail.value?? ""})}></IonInput>
            <IonButton onClick={update}>Actualizar</IonButton>

        </div>
    );
}