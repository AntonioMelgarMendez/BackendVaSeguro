const express = require('express');
const {
  getNotifications,
  getNotification,
  addNotification,
  editNotification,
  removeNotification,
} = require('../../controllers/Events/notification.controller');
const { authenticateToken, authorizeRoles } = require('../../middlewares/authentication');
const router = express.Router();

router.get('/', authenticateToken,getNotifications);
router.get('/:id', getNotification);
router.post('/',addNotification);
router.put('/:id', authenticateToken,editNotification);
router.delete('/:id', removeNotification);

module.exports = router;
