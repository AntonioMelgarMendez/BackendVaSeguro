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
    .not('routes.status_id', 'in', '(1,4)'); // Excluir "Sin iniciar" y "Finalizada"

  if (error) throw error;

  return data;
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
