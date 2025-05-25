const {
    getAllRegisterCodes,
    getRegisterCodeById,
    getRegisterCodeByCode,
    createRegisterCode,
    deleteRegisterCode,
  } = require('../../services/Events/registerCode.service');
  
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
  
  module.exports = {
    getRegisterCodes,
    getRegisterCode,
    validateCode,
    addRegisterCode,
    removeRegisterCode,
  };
  