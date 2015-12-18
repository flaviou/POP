Template.registerHelper("gh_user_email", (userId) => {
	var user = Meteor.users.findOne({_id: userId});
	return user.emails[0].address;
});

Template.registerHelper("gh_user_full_name", (userId) => {
	var user = Meteor.users.findOne({_id: userId});
	return user.profile.full_name;
});

Template.registerHelper("gh_selected_user", () => {
	return Session.get("selectedUser");
});