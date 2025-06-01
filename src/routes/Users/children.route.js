const express = require('express');
const router = express.Router();
const {
  getChildren,
  getChild,
  create,
  update,
  remove,
} = require('../../controllers/Users/children.controller');

const upload = require('../../middlewares/upload');

router.get('/', getChildren);
router.get('/:id', getChild);
router.post('/', upload.single('profile_pic'), create);
router.put('/:id', upload.single('profile_pic'), update); 
router.delete('/:id', remove);

module.exports = router;
