import { ClientsService } from '../services/ClientsService';
import './ExploreContainer.css';

interface ContainerProps { }

const ExploreContainer: React.FC<ContainerProps> = () => {
/*  console.log('prueba de código');
  const datos=await ClientsService.getClients();
  console.log(datos); */
  return (
    <div id="container">
      <strong>Ready to create an app?</strong>
      <p>Start with Ionic <a target="_blank" rel="noopener noreferrer" href="https://ionicframework.com/docs/components">UI Components</a></p>
    </div>
  );
};

export default ExploreContainer;
