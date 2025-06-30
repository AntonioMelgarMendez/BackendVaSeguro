const express = require('express');
const router = express.Router();
const routesController = require('../../controllers/Routes/route.controller');

router.get('/', routesController.getAllRoutes);
router.get('/:id', routesController.getRouteById);
router.post('/', routesController.createRoute);
router.post('/full', routesController.createFullRoute);

router.put('/:id', routesController.updateRoute);
router.delete('/:id', routesController.deleteRoute);

module.exports = router;
