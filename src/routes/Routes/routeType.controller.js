const express = require('express');
const router = express.Router();
const routeTypesController = require('../../controllers/Routes/routeType.controller');

router.get('/', routeTypesController.getAllRouteTypes);
router.get('/:id', routeTypesController.getRouteTypeById);
router.post('/', routeTypesController.createRouteType);
router.put('/:id', routeTypesController.updateRouteType);
router.delete('/:id', routeTypesController.deleteRouteType);

module.exports = router;
