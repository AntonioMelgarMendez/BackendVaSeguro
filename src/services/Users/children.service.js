const supabase = require('../../config/config');

async function getAllChildren() {
  const { data, error } = await supabase.from('children').select('*');
  if (error) throw error;
  return data;
}

async function getChildById(id) {
  const { data, error } = await supabase.from('children').select('*').eq('parent_id', id).single();
  if (error) throw error;
  return data;
}

async function createChild(payload) {
  const { data, error } = await supabase.from('children').insert([payload]).select().single();
  if (error) throw error;
  return data;
}

async function updateChild(id, payload) {
  const { data, error } = await supabase.from('children').update(payload).eq('id', id).select().single();
  if (error) throw error;
  return data;
}

async function deleteChild(id) {
  const { error } = await supabase.from('children').delete().eq('id', id);
  if (error) throw error;
}

module.exports = {
  getAllChildren,
  getChildById,
  createChild,
  updateChild,
  deleteChild,
};
