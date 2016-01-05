Meteor.methods({
  deleteUser: function (targetUserId) {
    check(targetUserId, String);
    var loggedInUser = Meteor.userId();
    if (!loggedInUser || !Roles.userIsInRole(loggedInUser, ['admin'])) {
      throw new Meteor.Error(403, "Access Denied");
    };
    Meteor.users.remove({_id: targetUserId});
  },
  updateUser: function(targetUserId, doc) {
    check(targetUserId, String);
    var loggedInUser = Meteor.userId();
    if (((loggedInUser) && (loggedInUser == targetUserId)) || Roles.userIsInRole(loggedInUser, ['admin'])) {
      Meteor.users.update(targetUserId, doc);
    } else {
      throw new Meteor.Error(403, "Access Denied");
    }
  }
});
