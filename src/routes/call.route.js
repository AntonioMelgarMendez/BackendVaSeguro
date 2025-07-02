const express = require('express');
const router = express.Router();
const callController = require('../controllers/calls.controller');

router.post('/calls', callController.createCall);
router.get('/calls/:id', callController.getCallById);

module.exports = router;