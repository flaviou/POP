Meteor.methods({
	deleteUser: function (targetUserId) {
		var loggedInUser = Meteor.user();
		if (!loggedInUser || !Roles.userIsInRole(loggedInUser, ['admin'])) {
			throw new Meteor.Error(403, "Access Denied");
		};
		Meteor.users.remove({_id: targetUserId});
	},
});
