const {
  fetchAllMessages,
  fetchChatBetweenUsers,
  insertMessage,
  removeMessage,
} = require('../../services/Users/chat.service');

// API REST Controllers
async function getAllMessages(req, res) {
  try {
    const messages = await fetchAllMessages();
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getChatBetweenUsers(req, res) {
  const { user1Id, user2Id } = req.params;
  try {
    const messages = await fetchChatBetweenUsers(user1Id, user2Id);
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function sendMessage(req, res) {
  try {
    const { sender_id, receiver_id, message } = req.body;
    const data = await insertMessage({ sender_id, receiver_id, message });

    // Emitimos el mensaje a los sockets conectados (si existe)
    if (global.io) {
      global.io.to(`user:${receiver_id}`).emit('newMessage', data);
      global.io.to(`user:${sender_id}`).emit('newMessage', data);
    }

    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function deleteMessage(req, res) {
  try {
    await removeMessage(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Socket.IO handler
function socketHandler(io) {
  global.io = io; // Para poder acceder desde otros lugares como sendMessage()

  io.on('connection', (socket) => {
    console.log('Cliente conectado:', socket.id);

    // Cliente se une a su canal personal
    socket.on('join', (userId) => {
      socket.join(`user:${userId}`);
      console.log(`Usuario ${userId} se unió a su canal`);
    });

    socket.on('disconnect', () => {
      console.log('Cliente desconectado:', socket.id);
    });
  });
}

module.exports = {
  getAllMessages,
  getChatBetweenUsers,
  sendMessage,
  deleteMessage,
  socketHandler,
};
