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
  const myDirection = dataAboutMe.direction;
  const myX = dataAboutMe.x;
  const myY = dataAboutMe.y;
  const moves = ['F','R'];
  const runAway = ['F','F','R'];

  if(prevScore < dataAboutMe.score) {
      action='T';
  } else {
    if(dataAboutMe.wasHit) {
      action = runAway[Math.floor(Math.random() * runAway.length)];
    }
    action = findEnemy()
    // if(lastAction === 'T')
      // action = moves[Math.floor(Math.random() * moves.length)]
    // else
    //   action = 'T';
  }
  prevScore = dataAboutMe.score;
  lastAction = action;
  res.send(action);

  function findEnemy(){
    Object.values(req.body.arena.state).forEach(el => {
      if(myDirection === 'N'){
        if(myX === el.x) {
          if(myY + 1 === el.y || myY + 2 === el.y || myY + 3 === el.y) {
            return 'T';
          }
        }
      }
      if(myDirection === 'S'){
        if(myX === el.x) {
          if(myY - 1 === el.y || myY - 2 === el.y || myY - 3 === el.y) {
            return 'T';
          }
        }
      }
      if(myDirection === 'E'){
        if(myY === el.y) {
          if(myX - 1 === el.x || myX - 2 === el.x || myX - 3 === el.x) {
            return 'T';
          }
        }
      }
      if(myDirection === 'W'){
        if(myY === el.y) {
          if(myX + 1 === el.x || myX + 2 === el.x || myX + 3 === el.x) {
            return 'T';
          }
        }
      }
    })
    action = moves[Math.floor(Math.random() * moves.length)];
    return action;
  }
//   res.send(moves[Math.floor(Math.random() * moves.length)]);
});

app.listen(process.env.PORT || 8080);
