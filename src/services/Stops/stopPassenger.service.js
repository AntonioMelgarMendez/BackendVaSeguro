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
    .from('stops_passengers')
    .select(`
      *,
      stop:stop_id (
        id,
        name,
        latitude,
        longitude
      ),
      child:child_id (
        *
      )
    `)
    .eq('child.driver_id', driverId);

  if (error) throw error;
  return data;
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
