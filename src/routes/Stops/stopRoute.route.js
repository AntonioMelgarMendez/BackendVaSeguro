const express = require('express');
const router = express.Router();
const controller = require('../../controllers/Stops/stopRoute.controller');


// GET /stops/active/:childId
router.get('/active/:childId', controller.getActiveStopRoutes);

// PUT /stops/:stopPassengerId/:routeId
router.put('/:stopPassengerId/:routeId', controller.updateStopRoute);


module.exports = router;
