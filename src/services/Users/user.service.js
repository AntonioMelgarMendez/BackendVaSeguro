// services/usersService.js
const supabase = require('../../config/config');

async function getAllUsers() {
  const { data, error } = await supabase.from('users').select('*');
  if (error) throw error;
  return data;
}

async function getUserById(id) {
  const { data, error } = await supabase.from('users').select('*').eq('id', id).single();
  if (error) throw error;
  return data;
}

async function createUser(user) {
  const { data, error } = await supabase.from('users').insert(user).single();
  if (error) throw error;
  return data;
}

async function updateUser(id, user) {
  const { data, error } = await supabase.from('users').update(user).eq('id', id).single();
  if (error) throw error;
  return data;
}

async function deleteUser(id) {
  const { data, error } = await supabase.from('users').delete().eq('id', id);
  if (error) throw error;
  return data;
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
