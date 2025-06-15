const {
    getAllRegisterCodes,
    getRegisterCodeById,
    getRegisterCodeByCode,
    createRegisterCode,
    deleteRegisterCode,
    updateRegisterCodeState,
    getUsersByIds
  } = require('../../services/Events/registerCode.service');
  const supabase = require('../../config/config');
  
  async function getRegisterCodes(req, res) {
    try {
      const codes = await getAllRegisterCodes();
      res.json(codes);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  
  async function getRegisterCode(req, res) {
    try {
      const code = await getRegisterCodeById(req.params.id);
      res.json(code);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  
  async function validateCode(req, res) {
    try {
      const { code } = req.body;
      const found = await getRegisterCodeByCode(code);
      res.json({ valid: true, data: found });
    } catch (err) {
      res.status(400).json({ valid: false, error: 'Código inválido' });
    }
  }
  
  async function addRegisterCode(req, res) {
    try {
      const newCode = await createRegisterCode(req.body);
      res.status(201).json(newCode);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  
  async function removeRegisterCode(req, res) {
    try {
      const result = await deleteRegisterCode(req.params.id);
      res.json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  async function updateCodeState(req, res) {
    try {
      const { id } = req.params;
      const updatedCode = await updateRegisterCodeState(id,true);
      res.json(updatedCode);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async function getUserCodes(req, res) {
    try {

      const { data: codes, error } = await supabase
        .from('register_code')
        .select('driver_id')
        .eq('state', false);
  
      if (error) throw error;
      const userIds = [...new Set(codes.map(c => c.driver_id))];
  
      if (userIds.length === 0) {
        return res.json([]); 
      }
      const users = await getUsersByIds(userIds);
      res.json(users);
    } catch (err) {
      console.error('Error getting user codes:', err.message);
      res.status(500).json({ error: 'Failed to fetch users with pending codes' });
    }
  }
  
  
  module.exports = {
    getRegisterCodes,
    getRegisterCode,
    validateCode,
    addRegisterCode,
    removeRegisterCode,
    updateCodeState,
    getUserCodes

  };
  