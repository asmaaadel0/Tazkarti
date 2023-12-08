const Team = require('../models/teamModel');

const getTeams = async (req, res) => {
  try {
    const teams = await Team.find();

    res.status(200).send(
      teams.map(team => {
        return { ...team.toObject() };
      })
    );
  } catch (err) {
    res.status(500).send({ err: err.message });
  }
};

const getTeamLogo = async (req, res) => {
  try {
    const team = await Team.findOne({ name: req.query.team });

    if (team) {
      res.status(200).json({ teamImageURL: team.logo });
    } else {
      res.status(404).json({ message: 'Team not found' });
    }
  } catch (err) {
    res.status(500).send({ err: err.message });
  }
};

module.exports = { getTeams, getTeamLogo };
