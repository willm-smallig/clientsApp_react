import { useState } from "react";
import { ClientsService } from "../services/ClientsService";
//import { useNavigate } from 'react-router-dom';

export default function AddPage(){
    console.log("nuevo cliente");
    //const navigate=useNavigate();
    const [client, setClient]=useState({name:"", email:"", phone:""});

    const save = async () => {
        await ClientsService.addClient(client);
    };
    
    return(
    <div>
        <h2>Nuevo cliente</h2>
        <input onChange={(e)=>setClient({...client,name:e.target.value})}/>
        <input onChange={(e)=>setClient({...client,email:e.target.value})}/>
        <input onChange={(e)=>setClient({...client,phone:e.target.value})}/>
        <button onClick={save}>Guardar</button>
    </div>
    );
}
