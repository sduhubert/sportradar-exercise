const { Event, Team, Sport } = require('../models/index');
const { Op } = require('sequelize');

const getAllEvents = async (req, res) => {
  try {
    // Get optional filters from headers
    const { sportId, dateFrom, count } = req.filters;

    const timestampWhere = {
      starts_at: { [Op.gte]: dateFrom }
    };

    const teamWhere = sportId ? { sport_id: sportId } : {};

    const events = await Event.findAll({
      where: timestampWhere,
      limit: count,
      order: [['starts_at', 'ASC']],
      include: [
        {
          model: Team,
          as: 'homeTeam',
          where: teamWhere,
          include: [{ model: Sport }]
        },
        {
          model: Team,
          as: 'awayTeam'
        }
      ]
    });

    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getAllEvents };