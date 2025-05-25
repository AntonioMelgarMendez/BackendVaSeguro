// routes/index.js
const express = require('express');
const childrenRoutes = require('./children.route');
const usersRoutes = require('./user.route');
const router = express.Router();

router.use('/children', childrenRoutes);
router.use('/users', usersRoutes);

module.exports = router;
