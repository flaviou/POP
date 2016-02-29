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

Meteor.users.helpers({
  userUpdatedBy: function() {
    var user = Meteor.users.findOne({_id: this.updatedBy});
    if (user) {
      return user.profile.full_name;
    }
    else {
      return '';
    }
  }
});

var visjsobj;
