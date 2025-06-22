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
  const { data, error } = await supabase
    .from('users')
    .update(user)
    .eq('id', id)
    .select()         
    .maybeSingle();   

  if (error) throw error;
  return data;
}


async function deleteUser(id) {
  const { data, error } = await supabase.from('users').delete().eq('id', id);
  if (error) throw error;
  return data;
}
async function getUserByEmail(email) {
  const { data, error } = await supabase.from('users').select('*').eq('email', email).single();
  if (error) throw error;
  return data;
}
async function logout(token){
  supabase.auth.signOut()
    .then(() => {
      console.log('User signed out successfully');
    })
    .catch((error) => {
      console.error('Error signing out:', error);
    });
}
async function saveResetCode(email, code) {
  const expiredAt = new Date(Date.now() + 15 * 60 * 1000); 

  // Revisa si ya existe un código para ese correo
  const { data: existing, error: fetchError } = await supabase
    .from('recovery_code')
    .select('*')
    .eq('mail', email)
    .single();

  if (fetchError && fetchError.code !== 'PGRST116') throw fetchError; // error diferente a "row not found"

  let result;
  if (existing) {
    // Actualizar código
    const { error } = await supabase
      .from('recovery_code')
      .update({ code, expired_at: expiredAt })
      .eq('mail', email);
    if (error) throw error;
  } else {
    // Insertar nuevo
    const { error } = await supabase
      .from('recovery_code')
      .insert({ mail: email, code, expired_at: expiredAt });
    if (error) throw error;
  }
}

async function validateResetCode(email, code) {
  const { data, error } = await supabase
    .from('recovery_code')
    .select('*')
    .eq('mail', email)
    .eq('code', code)
    .gte('expired_at', new Date().toISOString()) // must be in the future
    .maybeSingle();

  if (error) throw error;
  return !!data;
}

// Elimina el código una vez usado
async function clearResetCode(email) {
  const { error } = await supabase
    .from('recovery_code')
    .delete()
    .eq('mail', email);
  if (error) throw error;
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getUserByEmail,
  logout,
  saveResetCode,
  validateResetCode,  
  clearResetCode
};
