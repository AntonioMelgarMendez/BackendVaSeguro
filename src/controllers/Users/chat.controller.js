const {
    fetchAllMessages,
    fetchChatBetweenUsers,
    insertMessage,
    removeMessage,
  } = require('../../services/Users/chat.service');
  
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
  
  module.exports = {
    getAllMessages,
    getChatBetweenUsers,
    sendMessage,
    deleteMessage,
  };
  