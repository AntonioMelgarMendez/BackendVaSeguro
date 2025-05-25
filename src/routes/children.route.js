// routes/childrenRoutes.js
const express = require('express');
const { getChildren } = require('../controllers/children.controller');
const router = express.Router();

router.get('/', getChildren);

module.exports = router;
