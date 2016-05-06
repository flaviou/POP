/*
Picks.helpers({
  totalCost: function() {
    var total = 0;
    var aPlayers = this.players;
    Players.find({_id: {$in: aPlayers}}).map(function(doc) {
      if (doc.seasonPoints) {
        total += doc.seasonPoints;
      }
    });
    return total;
  }
})
*/
