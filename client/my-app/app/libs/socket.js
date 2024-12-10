import { io } from 'socket.io-client';


let socket;

export const getSocket = (query) => {
    if (!socket) {
        socket = io(process.env.URL_SERVER, {query});
    }
    return socket;
};

export const disconnectSocket = () => {
    if (socket) {
        socket.disconnect();
    }
    socket = null;
};