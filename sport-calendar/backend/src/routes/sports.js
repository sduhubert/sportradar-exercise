const router = require('express').Router();
const { getAllSports } = require('../controllers/sports');

router.get('/', getAllSports);

module.exports = router;