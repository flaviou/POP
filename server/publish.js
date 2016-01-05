Meteor.publish('globals', function(){
	return Globals.find();
});

Meteor.publish('myPicks', function() {
	return Picks.find({owner: this.userId});
});

Meteor.publish('players', function(){
  return Players.find();
});

Meteor.publish('teams', function(){
  return Teams.find();
});

Meteor.publish('users', function(filter) {
  if (!filter) {
    filter = {};
  }
  if (Roles.userIsInRole(this.userId, ['admin'])) {
    return Meteor.users.find(filter);
  } else {
    return Meteor.users.find({$and: [{_id:this.userId}, filter]});
  }
});

