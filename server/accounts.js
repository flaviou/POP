Accounts.onCreateUser(function(options, user) {
  // We still want the default hook's 'profile' behavior.
  if (options.profile)
    user.profile = options.profile;
  Meteor.setTimeout(function() {
    Accounts.sendVerificationEmail(user._id);
  }, 2 * 1000);

  return user;
});

Accounts.onLogin(function() {
	var user_id = Meteor.userId();
	Meteor.users.update({_id: user_id},{$set: {last_login: new Date()}});
});

Accounts.config({
        sendVerificationEmail: true
});
