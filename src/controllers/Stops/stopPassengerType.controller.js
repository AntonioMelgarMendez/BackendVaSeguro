const service = require('../../services/Stops/stopPassengerType.service');

async function getAllTypes(req, res) {
  try {
    const types = await service.getAllTypes();
    res.json(types);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getTypeById(req, res) {
  try {
    const { id } = req.params;
    const type = await service.getTypeById(id);
    if (!type) return res.status(404).json({ message: 'Type not found' });
    res.json(type);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function createType(req, res) {
  try {
    const { type } = req.body;
    if (!type) return res.status(400).json({ message: 'Type is required' });
    const newType = await service.createType({ type });
    res.status(201).json(newType);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function updateType(req, res) {
  try {
    const { id } = req.params;
    const { type } = req.body;
    if (!type) return res.status(400).json({ message: 'Type is required' });
    const updated = await service.updateType(id, { type });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function deleteType(req, res) {
  try {
    const { id } = req.params;
    await service.deleteType(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getAllTypes,
  getTypeById,
  createType,
  updateType,
  deleteType,
};
