const supabase = require('../../config/config');

async function getAllRoutes() {
  const { data, error } = await supabase
    .from('routes')
    .select('*, route_status(status), route_types(type), vehicles(*)'); 
  if (error) throw error;
  return data;
}

async function getRouteById(id) {
  const { data, error } = await supabase
    .from('routes')
    .select('*, route_status(status), route_types(type), vehicles(*)')
    .eq('id', id)
    .single();
  if (error) throw error;
  return data;
}

async function createRoute(route) {
  // Validar aquí si quieres, o en controlador
  const { data, error } = await supabase.from('routes').insert([route]);
  if (error) throw error;
  return data[0];
}

async function updateRoute(id, route) {
  const { data, error } = await supabase.from('routes').update(route).eq('id', id);
  if (error) throw error;
  return data[0];
}

async function deleteRoute(id) {
  const { data, error } = await supabase.from('routes').delete().eq('id', id);
  if (error) throw error;
  return data;
}

module.exports = {
  getAllRoutes,
  getRouteById,
  createRoute,
  updateRoute,
  deleteRoute,
};
