const validateTeam = (req, res, next) => {
  const requiredProperties = ['name', 'initials'];
  if (requiredProperties.every((property) => req.body[property])) {
    return next();
  } 
    res.sendStatus(400);
};

module.exports = validateTeam;