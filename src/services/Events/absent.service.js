const supabase = require('../../config/config');

async function fetchAllAbsences({ childId, startDate, endDate }) {
    let query = supabase.from('absent').select('*');
  
    if (childId) query = query.eq('child_id', childId);
    if (startDate) query = query.gte('date', startDate);
    if (endDate) query = query.lte('date', endDate);
  
    const { data, error } = await query;
    if (error) throw error;
    return data;
  }
  

async function fetchAbsenceById(id) {
  const { data, error } = await supabase
    .from('absent')
    .select('*')
    .eq('id', id)
    .single();
  if (error) throw error;
  return data;
}

async function insertAbsence(absence) {
  const { data, error } = await supabase.from('absent').insert([absence]).select().single();
  if (error) throw error;
  return data;
}

async function modifyAbsence(id, updates) {
  const { data, error } = await supabase
    .from('absent')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

async function removeAbsence(id) {
  const { error } = await supabase.from('absent').delete().eq('id', id);
  if (error) throw error;
}

module.exports = {
  fetchAllAbsences,
  fetchAbsenceById,
  insertAbsence,
  modifyAbsence,
  removeAbsence,
};
