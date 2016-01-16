Meteor.publish('globals', function(){
	return Globals.find();
});

Meteor.publish('myPicks', function() {
	return Picks.find({owner: this.userId});
});

Meteor.publish('players', function(query){
  if (!query) {
    query = {};
  }
  return Players.find(query);
});

Meteor.publish('teams', function(){
  return Teams.find();
});

Meteor.publish('users', function(query) {
  if (!query) {
    query = {};
  }
  if (Roles.userIsInRole(this.userId, ['admin'])) {
    return Meteor.users.find(query);
  } else {
    return Meteor.users.find({$and: [{_id:this.userId}, query]});
  }
});

