const supabase = require('../../config/config');

async function fetchAllMessages() {
  const { data, error } = await supabase
    .from('chat')
    .select('*')
    .order('created_at', { ascending: true });

  if (error) throw error;
  return data;
}

async function fetchChatBetweenUsers(user1Id, user2Id) {
  const { data, error } = await supabase
    .from('chat')
    .select('*')
    .or(`and(sender_id.eq.${user1Id},receiver_id.eq.${user2Id}),and(sender_id.eq.${user2Id},receiver_id.eq.${user1Id})`)
    .order('created_at', { ascending: true });

  if (error) throw error;
  return data;
}

async function insertMessage({ sender_id, receiver_id, message }) {
  const { data, error } = await supabase
    .from('chat')
    .insert([
      {
        sender_id,
        receiver_id,
        message,
        created_at: new Date().toISOString(),
      },
    ])
    .select()
    .single();

  if (error) throw error;
  return data;
}

async function removeMessage(id) {
  const { error } = await supabase.from('chat').delete().eq('id', id);
  if (error) throw error;
}

module.exports = {
  fetchAllMessages,
  fetchChatBetweenUsers,
  insertMessage,
  removeMessage,
};
