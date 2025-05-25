const {
    getAllRoles,
    getRoleById,
    createRole,
    updateRole,
    deleteRole,
  } = require('../../services/Users/role.service');
  
  async function getRoles(req, res) {
    try {
      const roles = await getAllRoles();
      res.json(roles);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  
  async function getRole(req, res) {
    try {
      const role = await getRoleById(req.params.id);
      res.json(role);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  
  async function addRole(req, res) {
    try {
      const { role_name } = req.body;
      const newRole = await createRole(role_name);
      res.status(201).json(newRole);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  
  async function editRole(req, res) {
    try {
      const { role_name } = req.body;
      const updatedRole = await updateRole(req.params.id, role_name);
      res.json(updatedRole);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  
  async function removeRole(req, res) {
    try {
      const result = await deleteRole(req.params.id);
      res.json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  
  module.exports = {
    getRoles,
    getRole,
    addRole,
    editRole,
    removeRole,
  };
  