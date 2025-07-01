// services/callsService.js
const supabase = require('../config/config');

async function createCall(call) {
  const { data, error } = await supabase
    .from('Calls')
    .insert(call)
    .single();
  if (error) throw error;
  return data;
}

async function getPlayerIdForUser(playerId) {
    const { data, error } = await supabase
      .from('users')
      .select('onesignal_player_id')
      .eq('onesignal_player_id', playerId)
      .single();
    if (error) throw error;
    return data?.onesignal_player_id;
  }

async function getPlayerIdForUser(userId) {
    const { data, error } = await supabase
      .from('users')
      .select('onesignal_player_id')
      .eq('id', userId)
      .single();
    if (error) throw error;
    return data?.onesignal_player_id;
}

module.exports = {
  createCall,
  getCallById,
  getPlayerIdForUser
};