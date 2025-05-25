const express = require('express');
const {
  getAllMessages,
  getChatBetweenUsers,
  sendMessage,
  deleteMessage,
} = require('../../controllers/Users/chat.controller');

const router = express.Router();

// Obtener todos los mensajes (solo para admin o debug)
router.get('/', getAllMessages);

// Obtener mensajes entre dos usuarios (chat privado)
router.get('/:user1Id/:user2Id', getChatBetweenUsers);

// Enviar mensaje
router.post('/', sendMessage);

// Eliminar mensaje (opcional)
router.delete('/:id', deleteMessage);

module.exports = router;
