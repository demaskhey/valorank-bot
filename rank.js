import axios from 'axios';
var player = process.env.PLAYER; // Change game name here
var leaderboardRank; // the leaderboard rank
var rankedRating; // the ranked rating
var numberOfWins; // number of wins lol
var leaderboard;
var result;
var url = process.env.API_URL;
const getLB = function (start) {
  found = false;
  var startIndex = start;
  var leaderboard;
  return new Promise((resolve, reject) => {
    axios.get(url + startIndex, {
      headers: {
        'X-Riot-Token': process.env.X-RIOT-TOKEN
      }
    })
    .then(response => {
      resolve({response})
    })
  })
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// TMI event that runs whenever the app receives a message

var found = false;
var startIndex = 0;
    (async () => {
        while (!found) {
          await getLB(startIndex).then((msg) => {
              if (startIndex >= msg.response.data.totalPlayers) {
                  return 'pas dans la leaderboard frerot'
              }
              // get player list
              leaderboard = msg.response.data.players;
              if (leaderboard) {
                // browse list
                for (var i=0; i<99; i++) {
                  if (leaderboard[i].gameName.toLowerCase().includes(player.toLowerCase())) {
                    found = true;
                    leaderboardRank = leaderboard[i].leaderboardRank;
                    rankedRating = leaderboard[i].rankedRating;
                    numberOfWins = leaderboard[i].numberOfWins;
                  }
                  if (found) {
                    result =  'Rang : ' + leaderboardRank + ' / Score : ' + rankedRating +' pts / Victoires : ' + numberOfWins + ' les reufs';
                    console.log(result);
                    return;
                    }
                  }
                }
                if (!found) {
                    startIndex += 100;
                }
              });
          console.log(startIndex);
          await sleep(1200);
        }
        })()
