const express = require('express');
const {
  getNotifications,
  getNotification,
  addNotification,
  editNotification,
  removeNotification,
} = require('../../controllers/Events/notification.controller');

const router = express.Router();

router.get('/', getNotifications);
router.get('/:id', getNotification);
router.post('/', addNotification);
router.put('/:id', editNotification);
router.delete('/:id', removeNotification);

module.exports = router;
