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


router.get('/', authenticateToken, getChildren);
router.get('/:id',authenticateToken,getChild);
router.post('/',authenticateToken, upload.single('profile_pic'), create);
router.put('/:id',authenticateToken, upload.single('profile_pic'), authorizeRoles('admin','user'), update); 
router.delete('/:id', authenticateToken,authorizeRoles('admin','user'),remove);

module.exports = router;
