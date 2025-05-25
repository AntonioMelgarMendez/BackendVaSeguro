const supabase = require('../../config/config');

// Obtener todas las notificaciones
async function getAllNotifications() {
  const { data, error } = await supabase.from('notifications').select('*');
  if (error) throw error;
  return data;
}

// Obtener una notificación por ID
async function getNotificationById(id) {
  const { data, error } = await supabase.from('notifications').select('*').eq('id', id).single();
  if (error) throw error;
  return data;
}

// Crear una nueva notificación
async function createNotification(notification) {
  const { data, error } = await supabase.from('notifications').insert([notification]).select().single();
  if (error) throw error;
  return data;
}

// Actualizar una notificación por ID
async function updateNotification(id, updates) {
  const { data, error } = await supabase.from('notifications').update(updates).eq('id', id).select().single();
  if (error) throw error;
  return data;
}

// Eliminar una notificación
async function deleteNotification(id) {
  const { error } = await supabase.from('notifications').delete().eq('id', id);
  if (error) throw error;
  return { message: 'Notification deleted successfully' };
}

module.exports = {
  getAllNotifications,
  getNotificationById,
  createNotification,
  updateNotification,
  deleteNotification,
};
