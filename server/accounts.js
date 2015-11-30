Accounts.onCreateUser(function(options, user) {
  var ip = 'ip';
  user.ip = ip;
  // We still want the default hook's 'profile' behavior.
  if (options.profile)
    user.profile = options.profile;
  return user;
});

Accounts.onLogin(function() {
	var ip = getIp();
	var user_id = Meteor.userId();
	console.log(ip);
	console.log(user_id);	
	Meteor.users.update({_id: user_id},{$set: {'ip': ip, last_login: new Date()}});
});

function getIp() {
	var ip = 'no IP';
	if (this.connection) {
		ip = this.connection.clientAddress;
		console.log(ip);
	};
	return ip;
};