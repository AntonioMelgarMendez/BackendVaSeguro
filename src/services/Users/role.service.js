const supabase = require('../../config/config');

async function getAllRoles() {
  const { data, error } = await supabase.from('roles').select('*');
  if (error) throw error;
  return data;
}

async function getRoleById(id) {
  const { data, error } = await supabase.from('roles').select('*').eq('id', id).single();
  if (error) throw error;
  return data;
}

async function createRole(role_name) {
  const { data, error } = await supabase.from('roles').insert([{ role_name }]).select().single();
  if (error) throw error;
  return data;
}

async function updateRole(id, role_name) {
  const { data, error } = await supabase.from('roles').update({ role_name }).eq('id', id).select().single();
  if (error) throw error;
  return data;
}

async function deleteRole(id) {
  const { error } = await supabase.from('roles').delete().eq('id', id);
  if (error) throw error;
  return { message: 'Rol eliminado correctamente' };
}

module.exports = {
  getAllRoles,
  getRoleById,
  createRole,
  updateRole,
  deleteRole,
};
