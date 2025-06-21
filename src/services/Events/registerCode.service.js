const supabase = require('../../config/config');

// Obtener todos los códigos
async function getAllRegisterCodes() {
  const { data, error } = await supabase.from('register_code').select('*');
  if (error) throw error;
  return data;
}

// Obtener un código por ID
async function getRegisterCodeById(id) {
  const { data, error } = await supabase
    .from('register_code')
    .select('code')
    .eq('id', id)
    .single();
  if (error) throw error;
  return data.code; 
}
async function getRegisterCodeByDriverId(driverId) {
  const { data, error } = await supabase
    .from('register_code')
    .select('*')
    .eq('driver_id', driverId)
    .maybeSingle(); 

  if (error) throw error;
  return data;
}


// Obtener código por el valor del código (para validarlo al registrar padre)
async function getRegisterCodeByCode(code) {
  const { data, error } = await supabase.from('register_code').select('*').eq('code', code).single();
  if (error) throw error;
  return data;
}

// Crear un nuevo código
async function createRegisterCode({ code, driver_id }) {
  const { data, error } = await supabase
    .from('register_code')
    .insert([{ code, driver_id, state: false }]) 
    .select()
    .single();
  if (error) throw error;
  return data;
}
async function updateRegisterCodeState(driverId, newState) {
  const { data: code, error: findError } = await supabase
    .from('register_code')
    .select('id')
    .eq('driver_id', driverId)
    .single();
  if (findError) throw findError;

  // Update the state using the found id
  const { data, error } = await supabase
    .from('register_code')
    .update({ state: newState })
    .eq('id', code.id)
    .select()
    .single();
  if (error) throw error;
  return data;
}


// Eliminar código
async function deleteRegisterCode(id) {
  const { error } = await supabase.from('register_code').delete().eq('driver_id', id);
  if (error) throw error;
  return { message: 'Código eliminado correctamente' };
}
async function getUsersByIds(ids) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .in('id', ids);

  if (error) throw error;
  return data;
}

module.exports = {
  getAllRegisterCodes,
  getRegisterCodeById,
  getRegisterCodeByCode,
  createRegisterCode,
  deleteRegisterCode,
  updateRegisterCodeState,
  getRegisterCodeByDriverId,
  getUsersByIds
};
