const express = require('express');
const router = express.Router();
const controller = require('../../controllers/Trips/vehicles.controller');
const upload = require('../../middlewares/upload');

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', upload.single('car_pic'), controller.create);
router.put('/:id', upload.single('car_pic'), controller.update); 
router.delete('/:id', controller.remove);

module.exports = router;
