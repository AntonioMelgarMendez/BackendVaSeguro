const {
    getAllNotifications,
    getNotificationById,
    createNotification,
    updateNotification,
    deleteNotification,
  } = require('../../services/Events/notification.service');
  
  async function getNotifications(req, res) {
    try {
      const notifications = await getAllNotifications();
      res.json(notifications);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  
  async function getNotification(req, res) {
    try {
      const notification = await getNotificationById(req.params.id);
      res.json(notification);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  
  async function addNotification(req, res) {
    try {
      const newNotification = await createNotification(req.body);
      res.status(201).json(newNotification);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  
  async function editNotification(req, res) {
    try {
      const updated = await updateNotification(req.params.id, req.body);
      res.json(updated);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  
  async function removeNotification(req, res) {
    try {
      const result = await deleteNotification(req.params.id);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  
  module.exports = {
    getNotifications,
    getNotification,
    addNotification,
    editNotification,
    removeNotification,
  };
  