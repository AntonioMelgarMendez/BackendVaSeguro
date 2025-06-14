// controllers/usersController.js
const usersService = require('../../services/Users/user.service');
const supabase = require('../../config/config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { createRegisterCode } = require('../../services/Events/registerCode.service');

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
    let avatarUrl = req.avatarUrl || null;

    const { data: existingUser } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .maybeSingle();

    if (existingUser) {
      return res.status(400).json({ error: 'El usuario ya existe' });
    }
    const { data: newUser, error: createError } = await supabase
      .from('users')
      .insert({
        forenames,
        surnames,
        email,
        password: await bcrypt.hash(password, 10),
        phone_number,
        gender,
        role_id,
        profile_pic: avatarUrl
      })
      .select()
      .single();

    if (createError) throw createError;

    if (role_id == 4) {
      const generatedCode = generateRandomCode();
      console.log('Generando código:', generatedCode, 'para driver_id:', newUser.id);
    
      const registerCode = await createRegisterCode({
        code: generatedCode,
        driver_id: newUser.id
      });
    
      console.log('Código generado correctamente:', registerCode);
    }
    
    const token = jwt.sign(
      { id: newUser.id, role: newUser.role_id, email: newUser.email },
      process.env.SUPABASE_JWT_SECRET,
      { expiresIn: '7d' }
    );
    res.status(201).json({
      token,
      user: {
        id: newUser.id,
        email: newUser.email,
        forenames: newUser.forenames,
        surnames: newUser.surnames,
        phone_number: newUser.phone_number,
        profile_pic: newUser.profile_pic,
        role_id: newUser.role_id
      }
    });

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
async function login(req, res) {
  try {
    const { email, password } = req.body;

    const user = await usersService.getUserByEmail(email);
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).json({ error: 'Contraseña incorrecta' });

    const token = jwt.sign(
      { id: user.id, role: user.role_id, email: user.email },
      process.env.SUPABASE_JWT_SECRET, 
      { expiresIn: '7d' }
    );

    res.json({ token, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function logout(req, res) {
  if (!req.user) {
    return res.status(401).json({ error: 'No user authenticated' });
  }
  return res.status(200).json({ message: 'Logged out successfully' });
}


module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  login,
  logout
};
function generateRandomCode(length = 6) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}
