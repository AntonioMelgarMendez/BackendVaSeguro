const service = require('../../services/Trips/tripsStatusLog.service');

async function getAll(req, res) {
  try {
    const data = await service.getAllTripStatusLogs();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getById(req, res) {
  try {
    const { id } = req.params;
    const data = await service.getTripStatusLogById(id);
    res.json(data);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

async function create(req, res) {
  try {
    const entry = req.body;
    const data = await service.createTripStatusLog(entry);
    res.status(201).json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function update(req, res) {
  try {
    const { id } = req.params;
    const entry = req.body;
    const data = await service.updateTripStatusLog(id, entry);
    res.json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function remove(req, res) {
  try {
    const { id } = req.params;
    await service.deleteTripStatusLog(id);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
