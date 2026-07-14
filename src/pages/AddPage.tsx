import { useState } from "react";
import { ClientsService } from "../services/ClientsService";
import { useHistory } from "react-router"; //react-router-dom 5
//import { useNavigate } from 'react-router-dom';

export default function AddPage(){
    //console.log("nuevo cliente");
    //const navigate =useNavigate();//React Router 6
    const history=useHistory();
    const [client, setClient]=useState({name:"", email:"", phone:""});

    const save = async () => {
        await ClientsService.addClient(client);
        //NavigateEvent('/clients');
        history.push('/clients');
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
