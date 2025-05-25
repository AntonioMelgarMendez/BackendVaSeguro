const routeTypesService = require('../../services/Routes/routeType.service');

async function getAllRouteTypes(req, res) {
  try {
    const routeTypes = await routeTypesService.getAllRouteTypes();
    res.json(routeTypes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getRouteTypeById(req, res) {
  try {
    const { id } = req.params;
    const routeType = await routeTypesService.getRouteTypeById(id);
    if (!routeType) return res.status(404).json({ message: 'Route type not found' });
    res.json(routeType);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function createRouteType(req, res) {
  try {
    const routeType = req.body;
    const newRouteType = await routeTypesService.createRouteType(routeType);
    res.status(201).json(newRouteType);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function updateRouteType(req, res) {
  try {
    const { id } = req.params;
    const routeType = req.body;
    const updatedRouteType = await routeTypesService.updateRouteType(id, routeType);
    if (!updatedRouteType) return res.status(404).json({ message: 'Route type not found' });
    res.json(updatedRouteType);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function deleteRouteType(req, res) {
  try {
    const { id } = req.params;
    await routeTypesService.deleteRouteType(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getAllRouteTypes,
  getRouteTypeById,
  createRouteType,
  updateRouteType,
  deleteRouteType,
};
