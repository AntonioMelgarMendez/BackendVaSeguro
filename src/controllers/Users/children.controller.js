const {
  getAllChildren,
  getChildById,
  createChild,
  updateChild,
  deleteChild,
} = require('../../services/Users/children.service');

async function getChildren(req, res) {
  try {
    const children = await getAllChildren();
    res.json(children);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getChild(req, res) {
  try {
    const child = await getChildById(req.params.id);
    if (!child) return res.status(404).json({ message: 'Child not found' });
    res.json(child);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function create(req, res) {
  try {
    const newChild = await createChild(req.body);
    res.status(201).json(newChild);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function update(req, res) {
  try {
    const updated = await updateChild(req.params.id, req.body);
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function remove(req, res) {
  try {
    await deleteChild(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getChildren,
  getChild,
  create,
  update,
  remove,
};
