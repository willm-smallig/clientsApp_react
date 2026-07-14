import { IonButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';
import { useBootstrapBreakpoints } from 'react-bootstrap/esm/ThemeProvider';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Blank</IonTitle>
            <IonButtons slot="end">
              <IonButton routerLink='/'>Inicio</IonButton>
              <IonButton routerLink='/home'>Home</IonButton>
              <IonButton routerLink='/clients'>Ver clientes</IonButton>
              <IonButton routerLink='/nuevo'>Añadir cliente</IonButton>
            </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer />
      </IonContent>
    </IonPage>
  );
};

export default Home;
