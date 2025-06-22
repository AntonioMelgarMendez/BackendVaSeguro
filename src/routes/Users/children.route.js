const express = require('express');
const { authenticateToken, authorizeRoles } = require('../../middlewares/authentication');
const router = express.Router();
const {
  getChildren,
  getChild,
  create,
  update,
  remove,
} = require('../../controllers/Users/children.controller');

const upload = require('../../middlewares/upload');
const uploadChildrenAvatarToSupabase = require('../../middlewares/uploadChildren');


router.get('/', authenticateToken, getChildren);
router.get('/:id',authenticateToken,getChild);
router.post(
  '/children',
  authenticateToken,
  upload.single('profile_pic'),
  uploadChildrenAvatarToSupabase,
  create
);
router.put('/:id',authenticateToken, upload.single('profile_pic'), authorizeRoles('admin','user'), update); 
router.delete('/:id', authenticateToken,authorizeRoles('admin','user'),remove);

module.exports = router;
