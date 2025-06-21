// controllers/usersController.js
const usersService = require('../../services/Users/user.service');
const supabase = require('../../config/config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { createRegisterCode } = require('../../services/Events/registerCode.service');
const { getRegisterCodeByDriverId } = require('../../services/Events/registerCode.service');

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
    const userId = req.params.id;

    // ✅ Obtener los datos actuales del usuario
    const currentUser = await usersService.getUserById(userId);
    if (!currentUser) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    if (req.avatarUrl && currentUser.profile_pic) {
      const oldUrl = currentUser.profile_pic;
      const pathMatch = oldUrl.match(/usersavatar\/(.+)$/);
      if (pathMatch && pathMatch[1]) {
        const oldPath = pathMatch[1];

        const { error: deleteError } = await supabase
          .storage
          .from('usersavatar')
          .remove([oldPath]);

        if (deleteError) {
          console.warn('No se pudo eliminar la imagen anterior:', deleteError.message);
        } else {
          console.log('Imagen anterior eliminada:', oldPath);
        }
      }
    }
    if (req.avatarUrl) {
      userUpdate.profile_pic = req.avatarUrl;
    }

    const updatedUser = await usersService.updateUser(userId, userUpdate);
    if (updatedUser === null) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(updatedUser);
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    res.status(500).json({ error: error.message || 'Error interno' });
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

    if (user.role_id== 4) {
      const registerCode = await getRegisterCodeByDriverId(user.id);
      if (!registerCode || registerCode.state !== true) {
        return res.status(403).json({
          error: 'Cuenta no verificada. Espere la aprobación del administrador.',
          code: 403
        });
      }
    }

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

async function changePassword(req, res) {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.params.id;

    const user = await usersService.getUserById(userId);
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Contraseña actual incorrecta' });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await usersService.updateUser(userId, { password: hashedPassword });

    res.json({ message: 'Contraseña actualizada correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
async function recoverPassword(req, res) {
  try {
    const { email } = req.body;

    const user = await usersService.getUserByEmail(email);
    if (!user) return res.status(404).json({ error: 'Correo no encontrado' });

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.RESET_PASSWORD_SECRET,
      { expiresIn: '15m' }
    );
    console.log(`Token de recuperación para ${email}: ${token}`);

    res.json({ message: 'Correo de recuperación enviado (simulado)' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
async function resetPassword(req, res) {
  try {
    const { token, newPassword } = req.body;

    const decoded = jwt.verify(token, process.env.RESET_PASSWORD_SECRET);
    const userId = decoded.id;

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await usersService.updateUser(userId, { password: hashedPassword });

    res.json({ message: 'Contraseña restablecida con éxito' });
  } catch (err) {
    res.status(400).json({ error: 'Token inválido o expirado' });
  }
}


module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  login,
  logout,
  changePassword,
  recoverPassword,
  resetPassword

};
function generateRandomCode(length = 6) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}
