const express = require('express');
const {
  getAllAbsences,
  getAbsenceById,
  createAbsence,
  updateAbsence,
  deleteAbsence,
} = require('../../controllers/Events/absent.controller');
const { authenticateToken, authorizeRoles } = require('../../middlewares/authentication');
const router = express.Router();

router.get('/', authenticateToken,getAllAbsences);
router.get('/:id',authenticateToken, getAbsenceById);
router.post('/',authenticateToken, createAbsence);
router.put('/:id', authenticateToken,updateAbsence);
router.delete('/:id', authenticateToken,deleteAbsence);

module.exports = router;
