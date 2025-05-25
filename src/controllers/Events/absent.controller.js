const {
    fetchAllAbsences,
    fetchAbsenceById,
    insertAbsence,
    modifyAbsence,
    removeAbsence,
  } = require('../../services/Events/absent.service');
  
  async function getAllAbsences(req, res) {
    try {
      const data = await fetchAllAbsences();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  
  async function getAbsenceById(req, res) {
    try {
      const data = await fetchAbsenceById(req.params.id);
      if (!data) return res.status(404).json({ error: 'Not found' });
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  
  async function createAbsence(req, res) {
    try {
      const { justification, date, child_id } = req.body;
      const data = await insertAbsence({ justification, date, child_id });
      res.status(201).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  
  async function updateAbsence(req, res) {
    try {
      const id = req.params.id;
      const updates = req.body;
      const data = await modifyAbsence(id, updates);
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  
  async function deleteAbsence(req, res) {
    try {
      const id = req.params.id;
      await removeAbsence(id);
      res.status(204).send(); // No content
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  
  module.exports = {
    getAllAbsences,
    getAbsenceById,
    createAbsence,
    updateAbsence,
    deleteAbsence,
  };
  