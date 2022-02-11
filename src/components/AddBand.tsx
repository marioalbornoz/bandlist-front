import { IonButton,IonInput, IonItem, IonItemDivider, IonList } from '@ionic/react';
import { useContext, useState } from 'react';
import { SocketContext } from '../context/SocketContext';

type Props = {
    
}

export const AddBand : React.FC<Props> = () => {

  const {socket} = useContext(SocketContext)
  const [text, setText] = useState<string>();

  
  const agregarBanda = (name: string)=>{
    if(name.trim() !=="") socket.emit('crear-banda', name);
  }
  return (
    <>
      <div>Agrgar banda</div>
      <IonList>
        <IonItemDivider>Ejemplo: Oasis</IonItemDivider>
        <IonItem>
          <IonInput
            value={text}
            placeholder="Ingrese banda"
            onIonChange={(e) => setText(e.detail.value!)}
          />
          <IonButton
            onClick={() => {
              if (text) agregarBanda(text);
            }}
          >
            Agregar
          </IonButton>
        </IonItem>
      </IonList>
    </>
  );
}
