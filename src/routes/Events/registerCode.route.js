const express = require('express');
const {
  getRegisterCodes,
  getRegisterCode,
  validateCode,
  addRegisterCode,
  removeRegisterCode,
} = require('../../controllers/Events/registerCode.controller');

const router = express.Router();

router.get('/', getRegisterCodes);
router.get('/:id', getRegisterCode);
router.post('/validate', validateCode);
router.post('/', addRegisterCode);
router.delete('/:id', removeRegisterCode);

module.exports = router;
