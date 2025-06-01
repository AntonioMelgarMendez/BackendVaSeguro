const supabase = require('../../config/config');

async function getAllStopPassengerTypes() {
  const { data, error } = await supabase.from('stop_passsenger_types').select('*');
  if (error) throw error;
  return data;
}

async function getStopPassengerTypeById(id) {
  const { data, error } = await supabase
    .from('stop_passsenger_types')
    .select('*')
    .eq('id', id)
    .single();
  if (error) throw error;
  return data;
}

async function createStopPassengerType(entry) {
  const { data, error } = await supabase
    .from('stop_passsenger_types')
    .insert([entry])
    .select()
    .single();
  if (error) throw error;
  return data;
}

async function updateStopPassengerType(id, entry) {
  const { data, error } = await supabase
    .from('stop_passsenger_types')
    .update(entry)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

async function deleteStopPassengerType(id) {
  const { error } = await supabase
    .from('stop_passsenger_types')
    .delete()
    .eq('id', id);
  if (error) throw error;
}

module.exports = {
  getAllStopPassengerTypes,
  getStopPassengerTypeById,
  createStopPassengerType,
  updateStopPassengerType,
  deleteStopPassengerType,
};
