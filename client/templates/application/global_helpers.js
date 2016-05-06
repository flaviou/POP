Template.registerHelper("gh_user_email", function(userId) {
	var user = Meteor.users.findOne({_id: userId});
	if (user) {
		return user.emails[0].address;
	} else {
		return'';
	}
});

Template.registerHelper("gh_user_full_name", function(userId) {
	var user = Meteor.users.findOne({_id: userId});
	if (user) {
		return user.profile.full_name;
	} else {
		return 'Anonymous';
	}
});

Template.registerHelper("gh_selected_user", function() {
	return Session.get("selectedUser");
});

Template.registerHelper("gh_disabled", function()  {
	if (Meteor.user()) {
		return "";
	} else {
		return "disabled";
	}
});

Template.registerHelper("gh_show_warning", function() {
	if (Meteor.user()) {
		return "sr-only";
	} else {
		return "";
	}
});

Template.registerHelper("gh_show_standing", function() {
/*
	doc = Globals.findOne();
	if (doc) {
		return ((doc.phase == '2') || (doc.phase == '3'));
	} else {
		return false;
	}
*/
  return true;
});
