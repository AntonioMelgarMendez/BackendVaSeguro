const express = require('express');
const {
  getAllAbsences,
  getAbsenceById,
  createAbsence,
  updateAbsence,
  deleteAbsence,
} = require('../../controllers/Events/absent.controller');

const router = express.Router();

router.get('/', getAllAbsences);
router.get('/:id', getAbsenceById);
router.post('/', createAbsence);
router.put('/:id', updateAbsence);
router.delete('/:id', deleteAbsence);

module.exports = router;
