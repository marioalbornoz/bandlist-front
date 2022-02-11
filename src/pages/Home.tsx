import {  IonCol, IonContent, IonGrid, IonHeader, IonPage, IonRow, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { useContext } from 'react';
import { AddBand } from '../components/AddBand';
import { BandChart } from '../components/BandChart';
import { ListExample } from '../components/ListBands';
import { SocketContext } from '../context/SocketContext';
import './Home.css';

const Home: React.FC = () => {


  const {online} = useContext(SocketContext);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Listado de Bandas</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Listado de Bandas</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonGrid>
          <IonRow>
            <IonCol>
              <div>
                Service status:{" "}
                {online ? (
                  <IonText color="primary">Online</IonText>
                ) : (
                  <IonText color="danger"> Offline </IonText>
                )}{" "}
              </div>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="9">
              <div>
                <BandChart />

                <ListExample />
              </div>
            </IonCol>
            <IonCol size="3">
              <AddBand />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Home;
