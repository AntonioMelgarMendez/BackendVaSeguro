const express = require('express');
const {
  getRouteStatuses,
  getRouteStatus,
  addRouteStatus,
  editRouteStatus,
  removeRouteStatus,
} = require('../../controllers/Routes/routeStatus.controller');
const { authenticateToken, authorizeRoles } = require('../../middlewares/authentication');
const router = express.Router();

router.get('/',authenticateToken, getRouteStatuses);
router.get('/:id', authenticateToken,getRouteStatus);
router.post('/', authenticateToken,addRouteStatus);
router.put('/:id',authenticateToken, editRouteStatus);
router.delete('/:id', authenticateToken,removeRouteStatus);

module.exports = router;
