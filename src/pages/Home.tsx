import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonInput, IonItem, IonItemDivider, IonList, IonPage, IonRow, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect, useState } from 'react';
// import ExploreContainer from '../components/ExploreContainer';
// import { ListExample } from '../components/ListBands';
import io from 'socket.io-client';
import { ListExample } from '../components/ListBands';
import './Home.css';

interface Bands {
  id: string;
  name: string;
  votes: number;
}

const connectSocketServer = () =>{
  let socket = io('http://localhost:9000', {transports: ['websocket']});
  return socket;
}

const Home: React.FC = () => {

  const [socket] = useState(connectSocketServer())
  const [online, setOnline] = useState<boolean>(false)
  const [text, setText] = useState<string>();
  const [bands, setBands] = useState<Bands[]>([]);
  const [id, setId] = useState<string>("")

  // const [number, setNumber] = useState<number>();
  useEffect(()=>{
    setOnline(socket.connected);
  }, [socket])

  useEffect(()=>{
    socket.on('connect',()=>{
      setOnline(true)
    })

  },[socket])
  useEffect(()=>{
    socket.on('disconnect',()=>{
      setOnline(false)
    })

  },[socket])
  
  useEffect(()=>{
    socket.on('current-bands',(bands)=>{
      setBands(bands);
      
    })

  },[socket]);

  const votar = (id: string)=> {
    // console.log("votar-app");
    socket.emit('votar-banda', id)
    
  }

  const eliminar = (id: string)=> {
    // console.log("votar-app");
    socket.emit('eliminar-banda', id)
    
  }
  
  const cambiarNombre = (id: string, name: string)=> {
    console.log("entro en el cambiar nombre ",id, name);
    socket.emit('renombrar-banda', {id, name})
  }

  const agregarBanda = (name: string)=>{
    socket.emit('crear-banda', name)
  }

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
          <IonRow><IonCol><div>Service status: {online ? <IonText color="primary">Online</IonText> : <IonText color="danger"> Offline </IonText>}  </div></IonCol></IonRow>
          <IonRow>
            <IonCol size="9" >
              <div>
                <ListExample bands={bands} setBands={setBands} text={text} setText={setText} votar={votar} eliminar={eliminar} setId={setId} cambiarNombre={cambiarNombre}/>
                
              </div>
            </IonCol>
            <IonCol size="3">
              <div>Agrgar banda</div>
              <IonList>
              <IonItemDivider>Ejemplo: Oasis</IonItemDivider>
              <IonItem>
                <IonInput value={text} placeholder="Ingrese banda" onIonChange={e => setText(e.detail.value!)}/>
                <IonButton onClick={()=>{if(text)agregarBanda( text)}} >Agregar</IonButton>
              </IonItem>
              </IonList>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Home;
