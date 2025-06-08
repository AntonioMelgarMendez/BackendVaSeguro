const express = require('express');
const {
  getAllMessages,
  getChatBetweenUsers,
  sendMessage,
  deleteMessage,
} = require('../../controllers/Users/chat.controller');
const { authenticateToken, authorizeRoles } = require('../../middlewares/authentication');

const router = express.Router();

// Obtener todos los mensajes (solo para admin o debug)
router.get('/',authenticateToken, getAllMessages);

// Obtener mensajes entre dos usuarios (chat privado)
router.get('/:user1Id/:user2Id', authenticateToken,getChatBetweenUsers);

// Enviar mensaje
router.post('/', authenticateToken,sendMessage);

// Eliminar mensaje (opcional)
router.delete('/:id', authenticateToken,deleteMessage);

module.exports = router;
