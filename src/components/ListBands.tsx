import React, { useContext, useEffect, useState } from 'react';
import {IonList, IonItem, IonNote, IonButton, IonInput} from '@ionic/react';
import './ListBands.css'
import { SocketContext } from '../context/SocketContext';

interface Bands{
    name: string;
    id: string;
    votes: number;
}
type Props = {
    
}


export const ListExample: React.FC<Props> = () => {

    const {socket} = useContext(SocketContext)

    const [bands, setBands] = useState<Bands[]>([]);


    useEffect(()=>{
        socket.on('current-bands',(bands: any[]) => {
          setBands(bands);
          
        })
        return ()=> socket.off('current-bands')
    
      },[socket]);
    
    const handleClickVotes = ( id: string) => {
        socket.emit('votar-banda', id)
    
      }

    const eliminarBanda=(id:string)=>{
        socket.emit('eliminar-banda', id)

    }

    const handleClickName = (name: string, id: string) => {
        socket.emit('renombrar-banda', {id, name})

        
    }
   

     
    // @ts-ignore   
    return (
          
        <IonList>
            <IonList>
                  {
                    bands?.map((band )=> <IonItem key={band.id}  >
                        <IonNote slot="end" color="success"><h4>{band.votes}</h4></IonNote>
                        <IonInput value={band.name} placeholder={band.name} onIonBlur={(e: any)=>handleClickName(e.target.value, band.id)} ></IonInput>
                        <IonButton onClick={() => handleClickVotes(band.id)}>+1</IonButton>
                        <IonButton color="danger" onClick={(e: React.SyntheticEvent<EventTarget>) => eliminarBanda(band.id)}>Eliminar!</IonButton>

                    </IonItem>)
                }
            </IonList>
        </IonList>

      
    
)};