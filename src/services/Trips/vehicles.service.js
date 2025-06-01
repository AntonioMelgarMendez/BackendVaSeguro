const supabase = require('../../config/config');

async function getAllVehicles() {
  const { data, error } = await supabase.from('vehicles').select('*');
  if (error) throw error;
  return data;
}

async function getVehicleById(id) {
  const { data, error } = await supabase
    .from('vehicles')
    .select('*')
    .eq('id', id)
    .single();
  if (error) throw error;
  return data;
}

async function createVehicle(vehicle) {
  const { data, error } = await supabase
    .from('vehicles')
    .insert([vehicle])
    .select()
    .single();
  if (error) throw error;
  return data;
}

async function updateVehicle(id, vehicle) {
  const { data, error } = await supabase
    .from('vehicles')
    .update(vehicle)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

async function deleteVehicle(id) {
  const { error } = await supabase
    .from('vehicles')
    .delete()
    .eq('id', id);
  if (error) throw error;
}

module.exports = {
  getAllVehicles,
  getVehicleById,
  createVehicle,
  updateVehicle,
  deleteVehicle,
};
