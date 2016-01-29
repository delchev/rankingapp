/* global tabris */
var teamsPage = require('./teams-page');
var rankingPage = require('./ranking-page');

var teams = loadTeams();

tabris.ui.set({
  background: '#222e3d',
  textColor: '#d1ffa0'
});

tabris.create("Action", {
  title: "Ranking",
  image: "images/prize-action.png"
}).on("select", function() {
  if (tabris.ui.get('activePage').name !== 'ranks') {
    var ranksPage = rankingPage.create(rank(teams));
    ranksPage.name = 'ranks';
    ranksPage.open();
  }
});

teamsPage.create(teams).open();

function loadTeams() {
  var teams = require("./teams.json");
  teams.forEach(function (team) {
    team.score = computeScore();
  });
  return teams;
}

function rank(teams) {
  teams = teams.slice();
  teams.sort(function(a, b) {
    return b.score - a.score;
  });
  return teams;
}

function computeScore(team) {
  return Math.random();
}