const express = require('express');
const { getEventStatuses } = require('../../controllers/Events/eventStatus.controller');
const { authenticateToken, authorizeRoles } = require('../../middlewares/authentication');
const router = express.Router();

router.get('/', authenticateToken,getEventStatuses);

module.exports = router;
