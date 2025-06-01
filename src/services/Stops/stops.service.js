const supabase = require('../../config/config');

async function getAllStops() {
  const { data, error } = await supabase.from('stops').select('*');
  if (error) throw error;
  return data;
}

async function getStopById(id) {
  const { data, error } = await supabase
    .from('stops')
    .select('*')
    .eq('id', id)
    .single();
  if (error) throw error;
  return data;
}

async function createStop(entry) {
  const { data, error } = await supabase
    .from('stops')
    .insert([entry])
    .select()
    .single();
  if (error) throw error;
  return data;
}

async function updateStop(id, entry) {
  const { data, error } = await supabase
    .from('stops')
    .update(entry)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

async function deleteStop(id) {
  const { error } = await supabase.from('stops').delete().eq('id', id);
  if (error) throw error;
}

module.exports = {
  getAllStops,
  getStopById,
  createStop,
  updateStop,
  deleteStop,
};
