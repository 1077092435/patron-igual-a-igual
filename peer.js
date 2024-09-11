const http = require('http');
const socketIO = require('socket.io');
const socketIOClient = require('socket.io-client');

const port = process.env.PORT || 3000; // Usa el puerto especificado por la variable de entorno, o 3000 por defecto
const peers = ['http://localhost:3001', 'http://localhost:3002']; // Lista de nodos a los que se conectará

const server = http.createServer();
const io = socketIO(server);

io.on('connection', (socket) => {
    console.log(`Nuevo nodo conectado en puerto ${port}: ${socket.id}`);

    socket.on('message', (msg) => {
        console.log(`Mensaje recibido en puerto ${port} de ${socket.id}: ${msg}`);
        // Reenviar el mensaje a todos los nodos conectados
        io.emit('message', msg);
    });

    socket.on('disconnect', () => {
        console.log(`Nodo desconectado en puerto ${port}: ${socket.id}`);
    });
});

// Conectar a otros nodos
peers.forEach(peer => {
    const peerSocket = socketIOClient(peer);

    peerSocket.on('connect', () => {
        console.log(`Conectado a peer ${peer}`);
    });

    peerSocket.on('message', (msg) => {
        console.log(`Mensaje recibido de peer ${peer}: ${msg}`);
    });

    // Enviar un mensaje a todos los peers conectados
    setTimeout(() => {
        peerSocket.emit('message', `Hola desde el nodo en puerto ${port}!`);
    }, 5000);
});

// Iniciar el servidor en el puerto especificado
server.listen(port, () => {
    console.log(`Servidor de WebSockets corriendo en http://localhost:${port}`);
});
