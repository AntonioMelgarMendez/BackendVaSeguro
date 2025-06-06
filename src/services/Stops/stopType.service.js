const supabase = require('../../config/config');

async function getAllStopTypes() {
  const { data, error } = await supabase.from('stop_types').select('*');
  if (error) throw error;
  return data;
}

async function getStopTypeById(id) {
  const { data, error } = await supabase
    .from('stop_types')
    .select('*')
    .eq('id', id)
    .single();
  if (error) throw error;
  return data;
}

async function createStopType(entry) {
  const { data, error } = await supabase
    .from('stop_types')
    .insert([entry])
    .select()
    .single();
  if (error) throw error;
  return data;
}

async function updateStopType(id, entry) {
  const { data, error } = await supabase
    .from('stop_types')
    .update(entry)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

async function deleteStopType(id) {
  const { error } = await supabase
    .from('stop_types')
    .delete()
    .eq('id', id);
  if (error) throw error;
}

module.exports = {
  getAllStopTypes,
  getStopTypeById,
  createStopType,
  updateStopType,
  deleteStopType,
};
