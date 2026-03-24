const { Sport } = require('../models/index');

const getAllSports = async (req, res) => {
  try {
    const sports = await Sport.findAll({
      attributes: ['id', 'name']
    });
    res.json(sports);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getAllSports };