const router = require('express').Router();
const { getAllEvents } = require('../controllers/events');
const parseEventHeaders = require('../middleware/eventHeaders');

router.get('/', parseEventHeaders, getAllEvents);

module.exports = router;