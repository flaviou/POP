Template.shoppingCart.helpers({
  numOfPlayers: function() {
    var n = Session.get("numOfPlayers");
    return n ? n : 0;
  },
  teamCost: function() {
    var n = Session.get("teamCost");
    return n ? n : 0;
  },
  selectedPlayers: function() {
    return Session.get("selectedPlayers");
  }
})
