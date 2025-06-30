const supabase = require('../../config/config');

async function getAllStopsPassengers() {
  const { data, error } = await supabase.from('stops_passengers').select('*');
  if (error) throw error;
  return data;
}

async function getStopsPassengerById(id) {
  const { data, error } = await supabase
    .from('stops_passengers')
    .select('*')
    .eq('id', id)
    .single();
  if (error) throw error;
  return data;
}

async function getStopsPassengerByDriverId(driverId) {
  const { data, error } = await supabase
    .from('stops_route')
    .select(`
      stops_passengers:stops_passengers_id (
      *,
        stop:stop_id (
          id,
          name,
          latitude,
          longitude
        )
      ),
      route:route_id (
        vehicle:vehicle_id (
          driver_id
        )
      )
    `)
    .eq('route.vehicle.driver_id', driverId);

  if (error) throw error;

  // Extraer stops_passengers y eliminar duplicados por ID
  const passengers = data?.map(item => item.stops_passengers) || [];

  const uniqueById = new Map();
  for (const p of passengers) {
    if (p && !uniqueById.has(p.id)) {
      uniqueById.set(p.id, p);
    }
  }

  return Array.from(uniqueById.values());
}


async function createStopsPassenger(entry) {
  const { data, error } = await supabase
    .from('stops_passengers')
    .insert([entry])
    .select()
    .single();
  if (error) throw error;
  return data;
}

async function updateStopsPassenger(id, entry) {
  const { data, error } = await supabase
    .from('stops_passengers')
    .update(entry)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

async function deleteStopsPassenger(id) {
  const { error } = await supabase
    .from('stops_passengers')
    .delete()
    .eq('id', id);
  if (error) throw error;
}

module.exports = {
  getAllStopsPassengers,
  getStopsPassengerById,
  createStopsPassenger,
  updateStopsPassenger,
  deleteStopsPassenger,
  getStopsPassengerByDriverId,
};
