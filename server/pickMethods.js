Meteor.methods({
  insertPick: function(newDoc) {
    newDoc['createdOn'] = new Date();
    newDoc['owner'] = Meteor.userId();
    Picks.insert(newDoc);
  }
});
