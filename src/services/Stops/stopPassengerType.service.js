const supabase = require('../../config/config');

async function getAllTypes() {
  const { data, error } = await supabase.from('stop_passsenger_types').select('*');
  if (error) throw error;
  return data;
}

async function getTypeById(id) {
  const { data, error } = await supabase
    .from('stop_passsenger_types')
    .select('*')
    .eq('id', id)
    .single();
  if (error) throw error;
  return data;
}

async function createType(typeData) {
  const { data, error } = await supabase
    .from('stop_passsenger_types')
    .insert([typeData])
    .select()
    .single();
  if (error) throw error;
  return data;
}

async function updateType(id, typeData) {
  const { data, error } = await supabase
    .from('stop_passsenger_types')
    .update(typeData)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

async function deleteType(id) {
  const { error } = await supabase
    .from('stop_passsenger_types')
    .delete()
    .eq('id', id);
  if (error) throw error;
}

module.exports = {
  getAllTypes,
  getTypeById,
  createType,
  updateType,
  deleteType,
};
