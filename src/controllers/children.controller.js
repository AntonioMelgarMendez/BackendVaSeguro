// controllers/childrenController.js
const { getAllChildren } = require('../services/children.service');

async function getChildren(req, res) {
  try {
    const children = await getAllChildren();
    res.json(children);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { getChildren };
