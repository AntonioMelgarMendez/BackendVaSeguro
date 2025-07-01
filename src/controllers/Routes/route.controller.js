const routesService = require('../../services/Routes/route.service');

async function getAllRoutes(req, res) {
  try {
    const routes = await routesService.getAllRoutes();
    res.json(routes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getRouteById(req, res) {
  try {
    const { id } = req.params;
    const route = await routesService.getRouteById(id);
    if (!route) return res.status(404).json({ message: 'Route not found' });
    res.json(route);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getRouteByDriverId(req, res) {
  try {
    const { driverId } = req.params;
    const routes = await routesService.getRoutesByDriverId(driverId);
    if (!routes) return res.status(404).json({ message: 'Routes not found' });
    res.json(routes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function createRoute(req, res) {
  try {
    const route = req.body;
    if (!route.name || !route.start_date || !route.vehicle_id || !route.status_id || !route.type_id) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    const newRoute = await routesService.createRoute(route);
    res.status(201).json(newRoute);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function createFullRoute(req, res) {
  try {
    const route = req.body;
    if (!route.name || !route.start_date || !route.vehicle_id || !route.status_id || !route.type_id || !Array.isArray(route.stopRoute)) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    const newRoute = await routesService.createFullRoute(route);
    res.status(201).json(newRoute);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function updateRoute(req, res) {
  try {
    const { id } = req.params;
    const route = req.body;
    const updatedRoute = await routesService.updateRoute(id, route);
    if (!updatedRoute) return res.status(404).json({ message: 'Route not found' });
    res.json(updatedRoute);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function deleteRoute(req, res) {
  try {
    const { id } = req.params;
    await routesService.deleteRoute(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getAllRoutes,
  getRouteById,
  getRouteByDriverId,
  createRoute,
  createFullRoute,
  updateRoute,
  deleteRoute,
};
