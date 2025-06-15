const express = require('express');
const router = express.Router();
const controller = require('../../controllers/Trips/vehicles.controller');
const upload = require('../../middlewares/upload');

router.get('/',authenticateToken, authorizeRoles('admin'), controller.getAll);
router.get('/:id',authenticateToken, authorizeRoles('admin','user','driver'), controller.getById);
router.post('/', upload.single('car_pic'), controller.create);
router.put('/:id',authenticateToken, upload.single('car_pic'), controller.update); 
router.delete('/:id', authenticateToken,controller.remove);

module.exports = router;
