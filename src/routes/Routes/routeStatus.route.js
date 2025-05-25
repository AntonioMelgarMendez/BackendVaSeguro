const express = require('express');
const {
  getRouteStatuses,
  getRouteStatus,
  addRouteStatus,
  editRouteStatus,
  removeRouteStatus,
} = require('../../controllers/Routes/routeStatus.controller');

const router = express.Router();

router.get('/', getRouteStatuses);
router.get('/:id', getRouteStatus);
router.post('/', addRouteStatus);
router.put('/:id', editRouteStatus);
router.delete('/:id', removeRouteStatus);

module.exports = router;
