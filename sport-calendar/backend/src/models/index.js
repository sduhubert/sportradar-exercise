/*--------------------------------------------------*/
/* All associations between models are defined here */
/*--------------------------------------------------*/
const Sport = require('./sport');
const Team = require('./team');
const Event = require('./event');

// Sport to Team
Team.belongsTo(Sport, { foreignKey: 'sport_id' });
Sport.hasMany(Team, { foreignKey: 'sport_id' });

// Event to Team (both home and away)
Event.belongsTo(Team, { as: 'homeTeam', foreignKey: 'home_team_id' });
Event.belongsTo(Team, { as: 'awayTeam', foreignKey: 'away_team_id' });

module.exports = { Sport, Team, Event };