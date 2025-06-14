const supabase = require('../../config/config');

// Obtener todos los códigos
async function getAllRegisterCodes() {
  const { data, error } = await supabase.from('register_code').select('*');
  if (error) throw error;
  return data;
}

// Obtener un código por ID
async function getRegisterCodeById(id) {
  const { data, error } = await supabase.from('register_code').select('*').eq('id', id).single();
  if (error) throw error;
  return data;
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
async function updateRegisterCodeState(id, newState) {
  const { data, error } = await supabase
    .from('register_code')
    .update({ state: newState })
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
}


// Eliminar código
async function deleteRegisterCode(id) {
  const { error } = await supabase.from('register_code').delete().eq('id', id);
  if (error) throw error;
  return { message: 'Código eliminado correctamente' };
}

module.exports = {
  getAllRegisterCodes,
  getRegisterCodeById,
  getRegisterCodeByCode,
  createRegisterCode,
  deleteRegisterCode,
  updateRegisterCodeState,
  getRegisterCodeByDriverId
};
