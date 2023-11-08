const teams = require('../utils/teams');

const existingID = (req, res, next) => {
  const { id } = req.params;
  const findTeam = teams.find((team) => team.id === Number(id));

  if (!findTeam) {
    return res.status(404).json({ message: 'Team not found' });
  }

  next();
};

module.exports = existingID;