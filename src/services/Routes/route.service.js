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

async function createFullRoute(routeData) {
  const { stopRoute, ...routeInfo } = routeData;

  // Insertar la ruta
  const { data: routeInsert, error: routeError } = await supabase
    .from('routes')
    .insert([routeInfo])
    .select()
    .single();

  if (routeError) throw routeError;

  const routeId = routeInsert.id;

  // Preparar stopRoutes con route_id asignado
  const stopRoutesToInsert = stopRoute.map(sr => ({
    route_id: routeId,
    stops_passengers_id: sr.stopPassengerId,
    order: sr.order,
    state: sr.state
  }));

  // Insertar stops_routes
  const { error: stopRoutesError } = await supabase
    .from('stops_route')
    .insert(stopRoutesToInsert);

  if (stopRoutesError) throw stopRoutesError;

  return routeInsert;
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
  createFullRoute,
  updateRoute,
  deleteRoute,
};
