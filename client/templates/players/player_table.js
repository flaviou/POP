Template.playersTable.events({
  "click .js-players-reload": function() {
    Meteor.call("reloadPlayers");
  },
  "click .js-stats-reset": function() {
    Meteor.call("resetStats");
  },
  "click .js-stats-reload": function() {
    Meteor.call("reloadStats");
  }
});
