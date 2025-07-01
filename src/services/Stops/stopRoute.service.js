const supabase = require('../../config/config');

async function getActiveStopRoutesByChildId(childId) {
  const { data, error } = await supabase
    .from('stops_route')
    .select(`
      *,
      stops_passengers:stops_passengers_id (
        *,
        stops:stop_id (
          id,
          name,
          latitude,
          longitude
        )
      ),
      routes:route_id (
        *
      )
    `)
    .eq('stops_passengers.child_id', childId)
    .not('routes.status_id', 'in', '(1,4)')
    .not('route_id', 'is', null); // Asegurar que route_id no sea null

  if (error) throw error;

  // Filtrar adicionalmente por si acaso (como medida de seguridad)
  return data.filter(item => item.routes !== null);
}

async function updateStopRouteByPassengerAndRoute(stopPassengerId, routeId, entry) {
  const { data, error } = await supabase
    .from('stops_route')
    .update(entry)
    .eq('stops_passengers_id', stopPassengerId)
    .eq('route_id', routeId)
    .select()
    .single();

  if (error) throw error;
  return data;
}



module.exports = {
  getActiveStopRoutesByChildId,
  updateStopRouteByPassengerAndRoute,
};
