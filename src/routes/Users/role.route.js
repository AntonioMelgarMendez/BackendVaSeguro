const express = require('express');
const {
  getRoles,
  getRole,
  addRole,
  editRole,
  removeRole,
} = require('../../controllers/Users/role.controller');

const router = express.Router();

router.get('/', getRoles);
router.get('/:id', getRole);
router.post('/', addRole);
router.put('/:id', editRole);
router.delete('/:id', removeRole);

module.exports = router;
