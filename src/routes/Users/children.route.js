const express = require('express');
const {
  getChildren,
  getChild,
  create,
  update,
  remove,
} = require('../../controllers/Users/children.controller');
const router = express.Router();

router.get('/', getChildren); 
router.get('/:id', getChild); 
router.post('/', create);    
router.put('/:id', update);  
router.delete('/:id', remove);

module.exports = router;
