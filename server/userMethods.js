Meteor.methods({
	deleteUser: function (targetUserId) {
		var loggedInUser = Meteor.user();
		if (!loggedInUser || !Roles.userIsInRole(loggedInUser, ['admin'], 'default-group')) {
			throw new Meteor.Error(403, "Access Denied");
		};
		Meteor.users.remove({_id: targetUserId});
	},
	updateUser: function (targetUserId, updateDoc) {
		var loggedInUser = Meteor.user();
console.log(targetUserId);
console.log(loggedInUser);
console.log((targetUserId != loggedInUser));
		
		if ((!loggedInUser || !Roles.userIsInRole(loggedInUser, ['admin'], 'default-group')) && (targetUserId != loggedInUser._id)) {
			throw new Meteor.Error(403, "Access Denied");
		};
		updateDoc['updatedOn'] = new Date();
		updateDoc['updatedBy'] = Meteor.userId();
		Meteor.users.update({_id: targetUserId}, {$set: updateDoc});
	}
});