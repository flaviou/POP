Meteor.publish('entries', function(){
  return Entries.find();
});

Meteor.publish('globals', function(){
	return Globals.find();
});

Meteor.publish('picks', function(entryId) {
	check(entryId, String);
	return Picks.find({entryId: entryId});
});


Meteor.publish('users', function() {
	if (Roles.userIsInRole(this.userId, ['admin'])) {
		return Meteor.users.find();
	} else {
		return Meteor.users.find({_id:this.userId});
	}
});
