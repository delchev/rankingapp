/* global tabris */

var common = require('./common');

var MARGIN = 16;
var DETAILS_HEIGHT = 190;


var detailsView;
var teamList;

exports.create = function(teams) {
  var page = tabris.create("Page", {
    title: "Inno Week 2016",
    // backgroundImage: 'images/background.jpg',
    topLevel: true
  });
  detailsView = tabris.create("ImageView", {
    layoutData: { centerX: 0, height: DETAILS_HEIGHT },
    scaleMode: "fit",
    image: 'images/inno-title.png'
  }).appendTo(page);
  teamList = createTeamList(teams);
  teamList.set('top', DETAILS_HEIGHT);
  page.append(teamList);
  return page;
}

function createTeamList(teams) {
  var list = tabris.create("CollectionView", {
    layoutData: { left: 0, right: 0, top: 0, bottom: 0 },
    itemHeight: 54,
    items: teams,
    initializeCell: function (cell) {
      var imageView = tabris.create("ImageView", {
        layoutData: { left: MARGIN, centerY: 0, width: 48, height: 48 },
        scaleMode: "fit"
      }).appendTo(cell);
      var titleTextView = tabris.create("TextView", {
        layoutData: { left: [imageView, MARGIN], right: MARGIN, centerY: 0 },
        textColor: "#4a4a4a",
        font: "20px"
      }).appendTo(cell);
      // var summaryTextView = tabris.create("TextView", {
      //   layoutData: { left: 64, right: MARGIN, top: titleTextView },
      //   textColor: "#7b7b7b"
      // }).appendTo(cell);
      cell.on("change:item", function (widget, team) {
        imageView.set("image", team.image);
        titleTextView.set("text", team.name);
        // summaryTextView.set("text", team.summary);
        common.appearRow.call(list, cell);
      });
    }
  }).on("select", function(target, team) {
    viewDetails(team);
  });
  return list;
}


function viewDetails(team) {
  disappearLeft(detailsView, function () {
    detailsView.dispose();
    createDetailsView(team);
  });

}

function disappearLeft(widget, done) {
  widget.animate({
    opacity: 0,
    transform: {translationX: -100}
  }, {
    duration: 500,
    easing: "ease-out"
  });
  done && widget.once("animationend", done);
}

function createDetailsView(team) {
  detailsView = tabris.create("Composite", {
    layoutData: {left: 0, right: 0, top: 0, height: DETAILS_HEIGHT }
  });
  var imageView = tabris.create("ImageView", {
    layoutData: { left: MARGIN, top: MARGIN, bottom: MARGIN},
    scaleMode: "fit",
    image: team.image
  }).appendTo(detailsView);
  var titleView = tabris.create("TextView", {
    layoutData: {left: [imageView, MARGIN], top: MARGIN, right: MARGIN},
    font: 'bold 20px',
    text: team.name
  }).appendTo(detailsView);
  var summaryView = tabris.create("TextView", {
    layoutData: {left: [imageView, MARGIN], top: [titleView, MARGIN]},
    text: team.summary
  }).appendTo(detailsView);
  var membersView = tabris.create("TextView", {
    layoutData: {left: [imageView, MARGIN], top: [summaryView, MARGIN]},
    font: 'italic 14px',
    text: team.members && team.members.join(', ') || ''
  }).appendTo(detailsView);
  detailsView.insertBefore(teamList);

  common.appearZoom(imageView);
  appearLeft(titleView, 400);
  appearLeft(summaryView, 500);
  appearLeft(membersView, 600);
}

function appearLeft(widget, delay) {
  widget.set({
    opacity: 0,
    transform: { translationX: 100 }
  });
  widget.animate({
    opacity: 1,
    transform: { translationX: 0 }
  }, {
    delay: delay,
    duration: 400,
    easing: "ease-out"
  });
}

