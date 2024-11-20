const {Router} = require('express');
const router = Router();

const userRoutes = require('./user');
const authRoutes = require('./auth');

router.use('/users', userRoutes);
router.use('/auth', authRoutes);

module.exports = router;