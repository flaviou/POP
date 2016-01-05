//Meteor.subscribe('users');

Template.usersList.helpers({
  users: function () {
    return Meteor.users.find();
  }
});

