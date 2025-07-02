const supabase = require('../../config/config');

async function getAllRoutes() {
  const { data, error } = await supabase
    .from('routes')
    .select('*, route_status(status), route_types(type), vehicles(*)'); 
  if (error) throw error;
  return data;
}

async function getRoutesByDriverId(driverId) {
  const { data, error } = await supabase
    .from('routes')
    .select(`
      *,
      route_status:status_id (*),
      route_types:type_id (*),
      vehicles:vehicle_id (
        *,
        driver_id
      ),
      stops_route (
        *,
        stops_passengers:stops_passengers_id (
          *,
          stops:stop_id (
            id,
            name,
            latitude,
            longitude
          ),
          children:child_id (
            id,
            forenames,
            surnames,
            birth_date,
            driver_id,
            parent_id,
            medical_info,
            created_at,
            profile_pic,
            gender
          )
        )
      )
    `)
    .eq('vehicles.driver_id', driverId);

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
  const { data, error } = await supabase.from('routes').update(route).eq('id', id).select();
  if (error) throw error;
  return data[0];
}

async function closeAllRoutesExcept(id, driverId) {
  // 1. Obtener IDs de vehículos del driver
  const { data: vehicles, error: vehicleError } = await supabase
    .from('vehicles')
    .select('id')
    .eq('driver_id', driverId);

  if (vehicleError) throw vehicleError;

  const vehicleIds = vehicles.map(v => v.id);

  // 2. Actualizar todas las rutas de esos vehículos, excepto la especificada
  const { data, error } = await supabase
    .from('routes')
    .update({ status_id: 4 })
    .in('vehicle_id', vehicleIds)
    .neq('id', id)
    .select();

  if (error) throw error;

  return data;
}

async function closeAllRoutesByDriver(driverId) {
  // 1. Obtener los vehículos del driver
  const { data: vehicles, error: vehicleError } = await supabase
    .from('vehicles')
    .select('id')
    .eq('driver_id', driverId);

  if (vehicleError) throw vehicleError;

  // 2. Extraer los IDs
  const vehicleIds = vehicles.map(v => v.id);

  if (vehicleIds.length === 0) {
    return []; // No hay rutas que cerrar si el driver no tiene vehículos
  }

  // 3. Actualizar todas las rutas asociadas a esos vehículos
  const { data, error } = await supabase
    .from('routes')
    .update({ status_id: 4 })
    .in('vehicle_id', vehicleIds)
    .select();

  if (error) throw error;

  return data;
}

async function deleteRoute(id) {
  const { data, error } = await supabase.from('routes').delete().eq('id', id);
  if (error) throw error;
  return data;
}

module.exports = {
  getAllRoutes,
  getRouteById,
  getRoutesByDriverId,
  createRoute,
  createFullRoute,
  updateRoute,
  deleteRoute,
  closeAllRoutesByDriver,
  closeAllRoutesExcept
};
