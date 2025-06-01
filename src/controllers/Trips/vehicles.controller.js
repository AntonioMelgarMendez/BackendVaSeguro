const service = require('../../services/Trips/vehicles.service');
const supabase = require('../../config/config');
async function getAll(req, res) {
  try {
    const data = await service.getAllVehicles();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getById(req, res) {
  try {
    const { id } = req.params;
    const data = await service.getVehicleById(id);
    res.json(data);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}


async function create(req, res) {
    try {
      const vehicle = req.body;
      if (req.file) {
        const file = req.file;
        const fileName = `car_${Date.now()}_${file.originalname}`;
        const { error: uploadError } = await supabase
          .storage
          .from('busimage')
          .upload(`car_pics/${fileName}`, file.buffer, {
            contentType: file.mimetype
          });
  
        if (uploadError) throw uploadError;
  
        const { data: urlData } = supabase
          .storage
          .from('busimage')
          .getPublicUrl(`car_pics/${fileName}`);
  
        vehicle.car_pic = urlData.publicUrl;
      }
  
      const data = await service.createVehicle(vehicle);
      res.status(201).json(data);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async function update(req, res) {
    try {
      const { id } = req.params;
      const vehicle = req.body;
  
      if (req.file) {
        const file = req.file;
        const fileName = `car_${Date.now()}_${file.originalname}`;
  
        const { error: uploadError } = await supabase
          .storage
          .from('busimage')
          .upload(`car_pics/${fileName}`, file.buffer, {
            contentType: file.mimetype,
          });
  
        if (uploadError) throw uploadError;
  
        const { data: urlData } = supabase
          .storage
          .from('busimage')
          .getPublicUrl(`car_pics/${fileName}`);
  
        vehicle.car_pic = urlData.publicUrl;
      }
  
      const data = await service.updateVehicle(id, vehicle);
      res.json(data);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  
  async function remove(req, res) {
    try {
      const { id } = req.params;
      const vehicle = await service.getVehicleById(id);
      if (!vehicle) return res.status(404).json({ error: 'Vehicle not found' });
  
      if (vehicle.car_pic) {
        const urlParts = vehicle.car_pic.split('/');
        const filePath = urlParts.slice(7).join('/'); 
  
        const { error: deleteError } = await supabase
          .storage
          .from('busimage')
          .remove([filePath]);
  
        if (deleteError) {
          console.warn('Error deleting vehicle image from Supabase:', deleteError.message);
        }
      }
  
      await service.deleteVehicle(id);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
