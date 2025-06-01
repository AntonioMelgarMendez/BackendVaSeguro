const service = require('../../services/Stops/stopPassenger.service');

async function getAll(req, res) {
  try {
    const data = await service.getAllStopsPassengers();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getById(req, res) {
  try {
    const { id } = req.params;
    const item = await service.getStopsPassengerById(id);
    if (!item) return res.status(404).json({ message: 'Not found' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function create(req, res) {
  try {
    const { child_id, stop_id, route_id, type_id, order } = req.body;
    if (!child_id || !stop_id || !route_id || !type_id) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    const newItem = await service.createStopsPassenger({ child_id, stop_id, route_id, type_id, order });
    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function update(req, res) {
  try {
    const { id } = req.params;
    const { child_id, stop_id, route_id, type_id, order } = req.body;
    const updated = await service.updateStopsPassenger(id, { child_id, stop_id, route_id, type_id, order });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function remove(req, res) {
  try {
    const { id } = req.params;
    await service.deleteStopsPassenger(id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
