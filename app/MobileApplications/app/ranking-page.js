/* global tabris */

var common = require('./common');

var MARGIN = 16;

exports.create = function (teams) {
  var page = tabris.create('Page', {
    title: 'Ranking'
  });
  var imageView = tabris.create("ImageView", {
    layoutData: { top: 0, left: 0, right: 0 },
    scaleMode: 'fill',
    image: 'images/prize-banner.jpg'
  }).appendTo(page);
  createRankList(teams).set({
    layoutData: { left: MARGIN, right: MARGIN, top: [imageView, MARGIN] }
  }).appendTo(page);
  return page;
}

function createRankList(teams) {
  var rank = 0;
  teams = teams.map(function(team) {
    return {
      rank: ++rank,
      image: team.image,
      name: team.name
    }
  });

  var list = tabris.create("CollectionView", {
    itemHeight: 54,
    items: teams,
    initializeCell: function (cell) {
      var rankView = tabris.create("TextView", {
        layoutData: { left: MARGIN, width: 48, height: 48, centerY: 0 },
        textColor: "#d1ffa0",
        background: "#222e3d",
        alignment: "center",
        font: "bold 26px"
      }).appendTo(cell);
      var imageView = tabris.create("ImageView", {
        layoutData: { left: [rankView, MARGIN], centerY: 0, width: 48, height: 48 },
        scaleMode: "fit"
      }).appendTo(cell);
      var titleTextView = tabris.create("TextView", {
        layoutData: { left: [imageView, MARGIN], right: MARGIN, centerY: 0 },
        textColor: "#4a4a4a",
        font: "20px"
      }).appendTo(cell);
      cell.on("change:item", function (widget, team) {
        rankView.set("text", team.rank);
        imageView.set("image", team.image);
        titleTextView.set("text", team.name);
        common.appearRow.call(list, cell);
      });
    }
  });
  return list;
}