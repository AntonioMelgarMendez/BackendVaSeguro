const supabase = require('../../config/config');

async function getActiveStopRoutesByChildId(childId) {
    const { data, error } = await supabase
    .from('stops_route')
    .select(`
      *,
      stops_passengers:stops_passengers_id (*),
      routes:route_id (*)
    `)
    .eq('stops_passengers.child_id', childId)
    .not('routes.status_id', 'in', '(1,4)'); // Otra opción: .neq('routes.status_id', '1').neq('routes.status_id', '4')

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
