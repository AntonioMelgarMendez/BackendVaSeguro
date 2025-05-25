const supabase = require('../../config/config');

async function getAllRouteTypes() {
  const { data, error } = await supabase.from('route_types').select('*');
  if (error) throw error;
  return data;
}

async function getRouteTypeById(id) {
  const { data, error } = await supabase.from('route_types').select('*').eq('id', id).single();
  if (error) throw error;
  return data;
}

async function createRouteType(routeType) {
  const { data, error } = await supabase.from('route_types').insert([routeType]);
  if (error) throw error;
  return data[0];
}

async function updateRouteType(id, routeType) {
  const { data, error } = await supabase.from('route_types').update(routeType).eq('id', id);
  if (error) throw error;
  return data[0];
}

async function deleteRouteType(id) {
  const { data, error } = await supabase.from('route_types').delete().eq('id', id);
  if (error) throw error;
  return data;
}

module.exports = {
  getAllRouteTypes,
  getRouteTypeById,
  createRouteType,
  updateRouteType,
  deleteRouteType,
};
