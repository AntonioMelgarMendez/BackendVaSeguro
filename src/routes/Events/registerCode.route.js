const express = require('express');
const {
  getRegisterCodes,
  getRegisterCode,
  validateCode,
  addRegisterCode,
  removeRegisterCode,
} = require('../../controllers/Events/registerCode.controller');
const { authenticateToken, authorizeRoles } = require('../../middlewares/authentication');

const router = express.Router();

router.get('/', getRegisterCodes);
router.get('/:id', getRegisterCode);
router.post('/validate', validateCode);
router.post('/', addRegisterCode);
router.delete('/:id', removeRegisterCode);
router.patch('/:id/state', updateCodeState);

module.exports = router;
