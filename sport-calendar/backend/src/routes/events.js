const router = require('express').Router();
const { getAllEvents, addNewEvent } = require('../controllers/events');

router.get('/', getAllEvents);
router.post('/new', addNewEvent)

module.exports = router;