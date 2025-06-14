// registerCode.route.js

const express = require('express');
const {
  getRegisterCodes,
  getRegisterCode,
  validateCode,
  addRegisterCode,
  removeRegisterCode,
  updateCodeState,
  getUserCodes
} = require('../../controllers/Events/registerCode.controller');
const { authenticateToken, authorizeRoles } = require('../../middlewares/authentication');

const router = express.Router();

router.get('/users', authenticateToken,authorizeRoles('admin'),getUserCodes);
router.get('/:id', getRegisterCode);
router.get('/', getRegisterCodes);
router.post('/validate', validateCode);
router.post('/', addRegisterCode);
router.delete('/:id',  authenticateToken,authorizeRoles('admin'),removeRegisterCode);
router.patch('/:id/state', authenticateToken,authorizeRoles('admin'), updateCodeState);

module.exports = router;
