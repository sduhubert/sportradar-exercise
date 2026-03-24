const router = require('express').Router();

router.use('/events', require('./events'));
router.use('/sports', require('./sports'));
router.use('/teams', require('./teams'));

module.exports = router;