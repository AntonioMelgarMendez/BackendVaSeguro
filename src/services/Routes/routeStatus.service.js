const supabase = require('../../config/config');

async function getAllRouteStatus() {
  const { data, error } = await supabase.from('route_status').select('*');
  if (error) throw error;
  return data;
}

async function getRouteStatusById(id) {
  const { data, error } = await supabase.from('route_status').select('*').eq('id', id).single();
  if (error) throw error;
  return data;
}

async function createRouteStatus(status) {
  const { data, error } = await supabase.from('route_status').insert([{ status }]).select().single();
  if (error) throw error;
  return data;
}

async function updateRouteStatus(id, status) {
  const { data, error } = await supabase.from('route_status').update({ status }).eq('id', id).select().single();
  if (error) throw error;
  return data;
}

async function deleteRouteStatus(id) {
  const { error } = await supabase.from('route_status').delete().eq('id', id);
  if (error) throw error;
  return { message: 'Estado de ruta eliminado correctamente' };
}

module.exports = {
  getAllRouteStatus,
  getRouteStatusById,
  createRouteStatus,
  updateRouteStatus,
  deleteRouteStatus,
};
