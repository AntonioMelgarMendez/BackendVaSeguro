const supabase = require('../../config/config');

async function getAllStopsPassengersEvents() {
  const { data, error } = await supabase
    .from('stops_passengers_events')
    .select('*');
  if (error) throw error;
  return data;
}

async function getStopsPassengersEventById(id) {
  const { data, error } = await supabase
    .from('stops_passengers_events')
    .select('*')
    .eq('id', id)
    .single();
  if (error) throw error;
  return data;
}

async function createStopsPassengersEvent(entry) {
  const { data, error } = await supabase
    .from('stops_passengers_events')
    .insert([entry])
    .select()
    .single();
  if (error) throw error;
  return data;
}

async function updateStopsPassengersEvent(id, entry) {
  const { data, error } = await supabase
    .from('stops_passengers_events')
    .update(entry)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

async function deleteStopsPassengersEvent(id) {
  const { error } = await supabase
    .from('stops_passengers_events')
    .delete()
    .eq('id', id);
  if (error) throw error;
}

module.exports = {
  getAllStopsPassengersEvents,
  getStopsPassengersEventById,
  createStopsPassengersEvent,
  updateStopsPassengersEvent,
  deleteStopsPassengersEvent,
};
