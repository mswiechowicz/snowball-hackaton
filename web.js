const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

let shot = true;
let prevScore = 0;

app.get('/', function (req, res) {
  res.send('Let the battle begin!');
});

app.post('/', function (req, res) {
  console.log(req.body.arena.state[req.body._links.self.href]);
  const dataAboutMe = req.body.arena.state[req.body._links.self.href];
  const moves = ['T','F','L','R'];
  const runAway = ['F','F','L','P'];

  if(prevScore < dataAboutMe.score) {
      res.send('T');
  } else {
    if(dataAboutMe.wasHit) {
      res.send(runAway[Math.floor(Math.random() * runAway.length)])
    }
    if(Number(prevScore) === Number(dataAboutMe.score)) {
      res.send(moves[Math.floor(Math.random() * moves.length)]);
    } else
      res.send('T');
  }
  prevScore = dataAboutMe.score;

//   res.send(moves[Math.floor(Math.random() * moves.length)]);
});

app.listen(process.env.PORT || 8080);
