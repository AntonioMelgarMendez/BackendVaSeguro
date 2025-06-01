// controllers/usersController.js
const usersService = require('../../services/Users/user.service');
const supabase = require('../../config/config');

async function getUsers(req, res) {
  try {
    const users = await usersService.getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getUser(req, res) {
  try {
    const user = await usersService.getUserById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
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

    const newUser = await usersService.createUser({
      forenames,
      surnames,
      email,
      password,
      phone_number,
      gender,
      role_id,
      profile_pic: avatarUrl 
    });

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function updateUser(req, res) {
  try {
    const userUpdate = req.body;

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

      userUpdate.profile_pic = publicUrl.publicUrl;
    }

    const updatedUser = await usersService.updateUser(req.params.id, userUpdate);
    if (!updatedUser) return res.status(404).json({ error: 'User not found' });
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


async function deleteUser(req, res) {
  try {
    const user = await usersService.getUserById(req.params.id);

    if (!user) return res.status(404).json({ error: 'User not found' });

    if (user.profile_pic) {
      const urlParts = user.profile_pic.split('/'); 
      const filePath = urlParts.slice(7).join('/');

      await supabase.storage.from('useravatar').remove([filePath]);
    }

    await usersService.deleteUser(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
