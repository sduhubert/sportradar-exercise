const router = require('express').Router();
const { getTeamsBySport } = require('../controllers/teams');

router.get('/sports/:sportId', getTeamsBySport);

module.exports = router;