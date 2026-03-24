const { Team, Sport } = require('../models/index');

const getTeamsBySport = async (req, res) => {
  try {
    const { sportId } = req.params;

    const teams = await Team.findAll({
      where: { sport_id: sportId },
      include: [{ model: Sport }],
      order: [['name', 'ASC']]
    });

    res.json(teams);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getTeamsBySport };