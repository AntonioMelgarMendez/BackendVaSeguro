const express = require('express');
const usersController = require('../../controllers/Users/user.controller');
const upload = require('../../middlewares/upload');
const uploadAvatarToSupabase = require('../../middlewares/uploadAvatarToSupabase');
const { authenticateToken, authorizeRoles } = require('../../middlewares/authentication');
const router = express.Router();

router.get('/', authenticateToken, authorizeRoles('admin'), usersController.getUsers);
// Solo admin y driver puede listar usuarios

router.get('/:id', authenticateToken, authorizeRoles('admin', 'user'), usersController.getUser);
// Admin y el propio usuario pueden ver su perfil
// Para que "user" solo pueda ver su propio perfil,

router.post('/', upload.single('avatar'), uploadAvatarToSupabase, usersController.createUser);

router.put('/:id', authenticateToken, authorizeRoles('admin', 'user'), upload.single('avatar'), usersController.updateUser);
// Admin puede editar cualquier usuario, user solo el suyo (de nuevo, verificar en controlador)

router.delete('/:id', authenticateToken, authorizeRoles('admin','user'), usersController.deleteUser);
// Solo admin puede eliminar usuarios
router.post('/login', usersController.login);

router.post('/logout', authenticateToken, usersController.logout);


module.exports = router;
