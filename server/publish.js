Meteor.publish('globals', function(){
	return Globals.find();
});

Meteor.publish('entries', function(){
  return Entries.find();
});

Meteor.publish('picks', function(entryId) {
	check(entryId, String);
	return Picks.find({entryId: entryId});
});

