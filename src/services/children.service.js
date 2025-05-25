// services/childrenService.js
const supabase = require('../config/config');

async function getAllChildren() {
  const { data, error } = await supabase.from('children').select('*');
  if (error) throw error;
  return data;
}

module.exports = { getAllChildren };
