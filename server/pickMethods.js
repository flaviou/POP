Meteor.methods({
  deletePick: function(pickId) {
    check(pickId, String);
    var pick = Picks.findOne({_id: pickId});
    var loggedInUser = Meteor.userId();
    if (!loggedInUser || (pick.owner != loggedInUser)) {
      throw new Meteor.Error(403, "Access Denied");
    }
    Picks.remove({_id: pickId});
  },
  insertPick: function(newDoc) {
    var competition = Globals.findOne({current:1}).competition;
    newDoc['createdOn'] = new Date();
    newDoc['owner'] = Meteor.userId();
    newDoc['competion'] = competition;
    Picks.insert(newDoc);
  }
});
