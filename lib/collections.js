Globals = new Mongo.Collection('globals');

Globals.allow({
  update: function(userId, doc) {
    return (Roles.userIsInRole(userId, 'admin'));
  }
});

Picks = new Mongo.Collection('picks');

Players = new Mongo.Collection('players');

Teams = new Mongo.Collection('teams');

Meteor.users.allow({
	remove: function(userId, doc) {
		// only for Administrators
		return (Roles.userIsInRole(userId, 'admin'));
	},
	update: function(userId, doc, fields, modifier) {
		// only for Administrators
		return (Roles.userIsInRole(userId, 'admin') || ((doc._id == userId) && (fields.indexOf('roles') == -1)));
	}
});
