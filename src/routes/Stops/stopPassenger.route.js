const express = require('express');
const router = express.Router();
const controller = require('../../controllers/Stops/stopPassenger.controller');

// GET /stops-passengers/driver/:driverId
router.get('/driver/:driverId', controller.getByDriverId);

module.exports = router;