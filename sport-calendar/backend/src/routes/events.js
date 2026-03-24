const router = require('express').Router();
const { getAllEvents, addNewEvent, getEventById } = require('../controllers/events');

router.get('/', getAllEvents);
router.post('/new', addNewEvent)
router.get('/:id', getEventById);

module.exports = router;