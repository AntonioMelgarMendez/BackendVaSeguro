const express = require('express');
const { getEventStatuses } = require('../../controllers/Events/eventStatus.controller');
const router = express.Router();

router.get('/', getEventStatuses);

module.exports = router;
