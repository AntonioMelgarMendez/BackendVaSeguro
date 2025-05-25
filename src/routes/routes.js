// routes/index.js
const express = require('express');
const childrenRoutes = require('./Users/children.route');
const usersRoutes = require('./Users/user.route');
const absentRoutes = require('./Events/absent.route');
const chatRoutes = require('./Users/chat.route');
const eventStatusRoutes = require('./Events/evenStatus.route');
const notificationsRoutes = require('./Events/notification.route');
const registerCodeRoutes = require('./Events/registerCode.route');
const rolesRoutes = require('./Users/role.route');
const routeStatusRoutes = require('./Routes/routeStatus.route');
const routeTypeRoutes= require('./Routes/routeType.controller');
const routeRoutes= require('./Routes/route.route');
const stopPassengerTypesRoutes =require('./Stops/stopPassengerType.route');
const router = express.Router();

router.use('/children', childrenRoutes);
router.use('/users', usersRoutes);
router.use('/absent', absentRoutes);
router.use('/chat', chatRoutes);
router.use('/event-status', eventStatusRoutes);
router.use('/notifications', notificationsRoutes);
router.use('/register-codes', registerCodeRoutes);
router.use('/roles', rolesRoutes);
router.use('/route-status', routeStatusRoutes);
router.use('/route-type', routeTypeRoutes);
router.use('/routes', routeRoutes);
router.use('/stop-passenger-types', stopPassengerTypesRoutes);
module.exports = router;
