import React, { useEffect, useState } from 'react';
import {IonList, IonItem, IonLabel, IonNote, IonButton, IonInput} from '@ionic/react';
import './ListBands.css'

interface Bands{
    name: string;
    id: string;
    votes: number;
}
type Props = {
    bands: Bands[];
    setBands: any;
    text?: string;
    setText:any;
    votar:any;
    eliminar:any;
    setId: any;
    cambiarNombre:any
}


export const ListExample: React.FC<Props> = ({bands,text, setText, votar, eliminar, setId, cambiarNombre}) => {

    const [ name, setName ] = useState<string>("");

    // useEffect(()=>{

    // }, [bands])
    
    const handleClickVotes = ( id: string) => {
        setId(id)
        votar(id)       
      }

    const eliminarBanda=(id:string)=>{
        eliminar(id)
    }

    const handleClickName = (name: string, id: string) => {
        console.log("nombre ",name);
        cambiarNombre(id,name)
        
    }
   

     
    // @ts-ignore   
    return (
          
        <IonList>
            <IonList>
                  {
                    bands.map(band => <IonItem key={band.id}  >
                        <IonNote slot="end" color="success">{band.votes}</IonNote>
                        <IonInput value={band.name} placeholder={band.name} onIonBlur={(e: any)=>handleClickName(e.target.value, band.id)} ></IonInput>
                        {/* <IonLabel >{band.name}</IonLabel> */}
                        <IonButton onClick={() => handleClickVotes(band.id)}>+1</IonButton>
                        <IonButton color="danger" onClick={(e: React.SyntheticEvent<EventTarget>) => eliminarBanda(band.id)}>Eliminar!</IonButton>

                        {/* <IonCheckbox slot="start" /> */}
                    </IonItem>)
                }
            </IonList>
        </IonList>

      
    
)};