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
      if (!found) throw new Error('Código no encontrado');
      const users = await getUsersByIds([found.driver_id]);
      const driver = users && users.length > 0 ? users[0] : null;
      if (!driver) throw new Error('Conductor no encontrado');
      res.json({ valid: true, driver });
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
      const updatedCode = await updateRegisterCodeState(id, true);
  
      const code = await getRegisterCodeById(id);
      console.log("Register code:", JSON.stringify(code));
      console.log("Driver ID:", code.driver_id);
  
      const users = await getUsersByIds([code.driver_id]);
      console.log("Users array:", JSON.stringify(users));
  
      const user = users && users.length > 0 ? users[0] : null;
      console.log("Hola soy este usuario:", JSON.stringify(user));
  
      if (user && user.onesignal_player_id) {
        console.log(`Sending notification to user ${user.id} with player ID ${user.onesignal_player_id}`);
        await sendNotification({
          playerIds: [user.onesignal_player_id],
          title: 'Account Approved',
          message: 'Your account has been approved!',
          imageUrl: 'https://example.com/image.png',
          buttons: [
            { id: 'view', text: 'View', icon: 'ic_menu_view' }
          ],
          url: 'https://yourapp.com/account',
          androidSound: 'notification_sound'
        });
      } else {
        console.log("User or onesignal_player_id not found.");
      }
  
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
  