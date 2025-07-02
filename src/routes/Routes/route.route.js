const express = require('express');
const router = express.Router();
const routesController = require('../../controllers/Routes/route.controller');

router.put('/close-all-except/:driverId', routesController.closeAllRoutesExcept);
router.put('/close-all', routesController.closeAllRoutes);

router.get('/', routesController.getAllRoutes);
router.get('/:id', routesController.getRouteById);
router.get('/driver/:driverId', routesController.getRouteByDriverId);

router.post('/', routesController.createRoute);
router.post('/full', routesController.createFullRoute);

router.put('/:id', routesController.updateRoute);
router.delete('/:id', routesController.deleteRoute);

module.exports = router;
