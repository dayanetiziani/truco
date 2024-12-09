import { io } from 'socket.io-client';
import dotenv from 'dotenv';

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();

let socket;

export const getSocket = (query) => {
    if (!socket) {
        socket = io(process.env.URL_SERVIDOR, {query});
    }
    return socket;
};

export const disconnectSocket = () => {
    if (socket) {
        socket.disconnect();
    }
    socket = null;
};