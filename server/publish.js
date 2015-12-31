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

Meteor.publish('users', function() {
	if (Roles.userIsInRole(this.userId, ['admin'])) {
		return Meteor.users.find();
	} else {
		return Meteor.users.find({_id:this.userId});
	}
});
