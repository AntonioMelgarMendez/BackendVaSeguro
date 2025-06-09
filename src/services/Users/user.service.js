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

async function createUser(req, res) {
  try {
    const { forenames, surnames, email, password, phone_number, gender, role_id } = req.body;
    let avatarUrl = null;

    if (req.file) {
      const file = req.file;
      const filePath = `avatars/${Date.now()}-${file.originalname}`;

      const { error } = await supabase.storage
        .from('useravatar')
        .upload(filePath, file.buffer, {
          contentType: file.mimetype,
        });

      if (error) return res.status(500).json({ error: 'Error al subir imagen a Supabase' });

      const { data: publicUrl } = supabase.storage
        .from('useravatar')
        .getPublicUrl(filePath);

      avatarUrl = publicUrl.publicUrl;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const { data: newUser, error: createError } = await supabase
      .from('users')
      .insert({
        forenames,
        surnames,
        email,
        password: hashedPassword,
        phone_number,
        gender,
        role_id,
        profile_pic: avatarUrl || null
      })
      .single();

    if (createError) throw createError;
    const { data: loginData, error: loginError } = await supabase
      .auth
      .signInWithPassword({
        email: email,
        password: password 
      });

    if (loginError) throw loginError;
    res.status(201).json({
      user: newUser,
      token: loginData.session.access_token
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
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
async function getUserByEmail(email) {
  const { data, error } = await supabase.from('users').select('*').eq('email', email).single();
  if (error) throw error;
  return data;
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getUserByEmail
};
