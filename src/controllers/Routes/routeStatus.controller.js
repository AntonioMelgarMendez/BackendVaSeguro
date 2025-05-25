const {
    getAllRouteStatus,
    getRouteStatusById,
    createRouteStatus,
    updateRouteStatus,
    deleteRouteStatus,
  } = require('../../services/Routes/routeStatus.service');
  
  async function getRouteStatuses(req, res) {
    try {
      const statuses = await getAllRouteStatus();
      res.json(statuses);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  
  async function getRouteStatus(req, res) {
    try {
      const status = await getRouteStatusById(req.params.id);
      res.json(status);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  
  async function addRouteStatus(req, res) {
    try {
      const { status } = req.body;
      const newStatus = await createRouteStatus(status);
      res.status(201).json(newStatus);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  
  async function editRouteStatus(req, res) {
    try {
      const { status } = req.body;
      const updatedStatus = await updateRouteStatus(req.params.id, status);
      res.json(updatedStatus);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  
  async function removeRouteStatus(req, res) {
    try {
      const result = await deleteRouteStatus(req.params.id);
      res.json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  
  module.exports = {
    getRouteStatuses,
    getRouteStatus,
    addRouteStatus,
    editRouteStatus,
    removeRouteStatus,
  };
  