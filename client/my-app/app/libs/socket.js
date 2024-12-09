import { io } from 'socket.io-client';

let socket;

export const getSocket = (query) => {
    if (!socket) {
        socket = io(process.env.NEXT_PUBLIC_SOCKET_URL, {query});
    }
    return socket;
};

export const disconnectSocket = () => {
    if (socket) {
        socket.disconnect();
    }
    socket = null;
};