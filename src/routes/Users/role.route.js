const express = require('express');
const {
  getRoles,
  getRole,
  addRole,
  editRole,
  removeRole,
} = require('../../controllers/Users/role.controller');
const { authenticateToken, authorizeRoles } = require('../../middlewares/authentication');

const router = express.Router();

router.get('/', getRoles);
router.get('/:id', getRole);
router.post('/', authenticateToken,authorizeRoles('admin'),addRole);
router.put('/:id',authenticateToken,authorizeRoles('admin') ,editRole);
router.delete('/:id', authenticateToken,authorizeRoles('admin'),removeRole);

module.exports = router;
