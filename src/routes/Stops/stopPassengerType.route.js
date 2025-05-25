const express = require('express');
const router = express.Router();
const controller = require('../../controllers/Stops/stopPassengerType.controller');

router.get('/', controller.getAllTypes);
router.get('/:id', controller.getTypeById);
router.post('/', controller.createType);
router.put('/:id', controller.updateType);
router.delete('/:id', controller.deleteType);

module.exports = router;
