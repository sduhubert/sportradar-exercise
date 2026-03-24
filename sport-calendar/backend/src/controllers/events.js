const { Event, Team, Sport } = require('../models/index');
const { Op } = require('sequelize');

const getAllEvents = async (req, res) => {
  try {
    const { sport, dateFrom, count } = req.query;

    const parsedDate = (dateFrom && !isNaN(Date.parse(dateFrom))) ? new Date(dateFrom) : new Date();

    const parsedCount = count ? parseInt(count) : 100;
    
    const eventWhere = {
      starts_at: { [Op.gte]: parsedDate }
    };

    const includeOptions = [
      {
        model: Team,
        as: 'homeTeam',
        include: [{ model: Sport }],
        where: sport ? { sport_id: parseInt(sport) } : {}
      },
      {
        model: Team,
        as: 'awayTeam'
      }
    ];

    const events = await Event.findAll({
      where: eventWhere,
      limit: parsedCount,
      order: [['starts_at', 'ASC']],
      include: includeOptions
    });

    res.json(events);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// internal function to avoid code redundance
const fetchFullEvent = async (id) => {
  return await Event.findByPk(id, {
    include: [
      { 
        model: Team, 
        as: 'homeTeam', 
        include: [Sport] 
      },
      { 
        model: Team, 
        as: 'awayTeam' 
      }
    ]
  });
};

const addNewEvent = async (req, res) => {
  try {
    const { starts_at, home_team_id, away_team_id } = req.body;

    if (!starts_at || !home_team_id || !away_team_id) {
      return res.status(400).json({ error: "All fields are required." });
    }

    if (home_team_id === away_team_id) {
      return res.status(400).json({ error: "Home and Away teams must be different." });
    }

    const newEvent = await Event.create({
      starts_at,
      home_team_id: parseInt(home_team_id),
      away_team_id: parseInt(away_team_id)
    });

    const fullEvent = await fetchFullEvent(newEvent.id)

    res.status(201).json(fullEvent);
  } catch (err) {
    console.error('Error creating event:', err);
    res.status(500).json({ error: err.message });
  }
};

const getEventById = async (req, res) => {
  try {
    const event = await fetchFullEvent(req.params.id);

    if (!event) return res.status(404).json({ error: "Event not found" });
    
    res.json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getAllEvents, addNewEvent, getEventById };