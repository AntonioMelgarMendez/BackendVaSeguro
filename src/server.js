// src/server.js
require('dotenv').config();
const app = require('./app');
const http = require('http');
const { socketHandler } = require('./controllers/Users/chat.controller');

const PORT = process.env.PORT || 3000;

// Crear el servidor HTTP
const server = http.createServer(app);

// Iniciar Socket.IO
const io = require('socket.io')(server, {
  cors: { origin: '*', methods: ['GET', 'POST'] },
});
socketHandler(io);

// Iniciar el servidor
server.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
});
