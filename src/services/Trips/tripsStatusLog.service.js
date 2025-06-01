const supabase = require('../../config/config');

async function getAllTripStatusLogs() {
  const { data, error } = await supabase.from('trip_status_log').select('*');
  if (error) throw error;
  return data;
}

async function getTripStatusLogById(id) {
  const { data, error } = await supabase
    .from('trip_status_log')
    .select('*')
    .eq('id', id)
    .single();
  if (error) throw error;
  return data;
}

async function createTripStatusLog(entry) {
  const { data, error } = await supabase
    .from('trip_status_log')
    .insert([entry])
    .select()
    .single();
  if (error) throw error;
  return data;
}

async function updateTripStatusLog(id, entry) {
  const { data, error } = await supabase
    .from('trip_status_log')
    .update(entry)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

async function deleteTripStatusLog(id) {
  const { error } = await supabase
    .from('trip_status_log')
    .delete()
    .eq('id', id);
  if (error) throw error;
}

module.exports = {
  getAllTripStatusLogs,
  getTripStatusLogById,
  createTripStatusLog,
  updateTripStatusLog,
  deleteTripStatusLog,
};
