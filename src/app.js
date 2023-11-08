const express = require('express');
const validateTeam = require('./middlewares/validateTeam');
const existingID = require('./middlewares/existingId');
const teams = require('./utils/teams');

const app = express();
const apiCredentials = require('./middlewares/apiCredentials');

let nextId = 3;

app.use(express.json());
app.use(apiCredentials);

app.get('/teams', (req, res) => res.status(200).json({ teams }));

app.post('/teams', validateTeam, (req, res) => {
  const team = { id: nextId, ...req.body };
  teams.push(team);
  nextId += 1;
  res.status(201).json(team);
});

app.put('/teams/:id', existingID, validateTeam, (req, res) => {
  const id = Number(req.params.id);
  const team = teams.find((t) => t.id === id);
  if (team) {
    const index = teams.indexOf(team);
    const updated = { id, ...req.body };
    teams.splice(index, 1, updated);
    res.status(201).json(updated);
  } else {
    res.sendStatus(400);
  }
});

app.get('/teams/:id', existingID, (req, res) => {
  const team = teams.find(({ id }) => id === Number(req.params.id));
  res.status(200).json(team);
});

app.delete('/teams/:id', existingID, (req, res) => {
  const { id } = req.params;
  const arrayPosition = teams.findIndex((team) => team.id === Number(id));
  teams.splice(arrayPosition, 1);

  res.status(200).end();
});

module.exports = app;