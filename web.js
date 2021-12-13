const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

let lastAction;
let action;
let prevScore = 0;

app.get('/', function (req, res) {
  res.send('Let the battle begin!');
});

app.post('/', function (req, res) {
  // console.log(req.body.arena.state[req.body._links.self.href]);
  const dataAboutMe = req.body.arena.state[req.body._links.self.href];
  const moves = ['T','F','L','R'];
  const runAway = ['F','F','L','P'];

  if(prevScore < dataAboutMe.score) {
      action='T';
  } else {
    if(dataAboutMe.wasHit || (prevScore > dataAboutMe.score)) {
      action = runAway[Math.floor(Math.random() * runAway.length)];
    }
    if(lastAction === 'T')
      action = moves[Math.floor(Math.random() * moves.length)]
    else
      action = 'T';
  }
  prevScore = dataAboutMe.score;
  lastAction = action;
  res.send(action);
//   res.send(moves[Math.floor(Math.random() * moves.length)]);
});

app.listen(process.env.PORT || 8080);
