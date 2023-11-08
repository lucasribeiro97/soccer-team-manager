const validateTeam = (req, res, next) => {
  const { name, initials } = req.body;
  if (!name) return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  if (!initials) return res.status(400).json({ message: 'O campo "initials" é obrigatório' });
  next();
};

module.exports = validateTeam;