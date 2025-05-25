const supabase = require('../../config/config');

async function getAllEventStatuses() {
  const { data, error } = await supabase.from('event_status').select('*');
  if (error) throw error;
  return data;
}

module.exports = {
  getAllEventStatuses,
};
