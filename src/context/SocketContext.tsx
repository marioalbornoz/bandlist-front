import {createContext} from 'react';


interface SocketState {
    socket: any;
    online:boolean;
}

type SocketContextProps = {
    socketState : SocketState;
    socket: any;
    online:boolean;

}

export const SocketContext = createContext<SocketState>({} as SocketContextProps);