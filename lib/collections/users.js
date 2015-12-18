Meteor.users.allow({
	remove: function(userId, doc) {
		// only for Administrators
		return true;
	},
	update: function(userId, doc) {
		// only for Administrators
		return true;
	}
});