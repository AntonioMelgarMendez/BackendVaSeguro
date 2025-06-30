const stopsService = require('../../services/Stops/stopRoute.service');

async function getActiveStopRoutes(req, res) {
  try {
    const { childId } = req.params;
    const data = await stopsService.getActiveStopRoutesByChildId(childId);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function updateStopRoute(req, res) {
  try {
    const { stopPassengerId, routeId } = req.params;
    const entry = req.body;
    const data = await stopsService.updateStopRouteByPassengerAndRoute(stopPassengerId, routeId, entry);
    res.json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = {
  updateStopRoute,
  getActiveStopRoutes,
};