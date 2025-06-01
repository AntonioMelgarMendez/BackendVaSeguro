const { getAllEventStatuses } = require('../../services/Events/evenStatus.service,');

async function getEventStatuses(req, res) {
  try {
    const statuses = await getAllEventStatuses();
    res.json(statuses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { getEventStatuses };
