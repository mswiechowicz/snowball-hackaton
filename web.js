const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

let counter = 0;
let prevScore = 0;

app.get('/', function (req, res) {
  res.send('Let the battle begin!');
});

app.post('/', function (req, res) {
  console.log(req.body.arena.state[req.body._links.self.href]);
  const dataAboutMe = req.body.arena.state[req.body._links.self.href];
  const moves = ['T','F','L','R'];
  const moveOrShot = ['F','T','T','T','T'];
  const runAway = ['F','F','L','P'];
  if(prevScore < dataAboutMe.score) {
      res.send('T');
  }
  prevScore = dataAboutMe.score;
  if(dataAboutMe.wasHit) {
      res.send(runAway[Math.floor(Math.random() * runAway.length)])
  }
  if(counter < 4) {
      if(prevScore < dataAboutMe.score)
          res.send('T')
      else
          res.send('F')
       counter++;
  } else {
      res.send(moves[Math.floor(Math.random() * moves.length)]);
      counter = 0;
  }
//   res.send(moves[Math.floor(Math.random() * moves.length)]);
});

app.listen(process.env.PORT || 8080);
