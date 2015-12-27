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

Template.registerHelper("gh_upvote_count", function(postId) {
	var post = Posts.findOne({id:postId});
	var votes = 0;
	if ((post) && (post.upvotes)) {
		votes = post.upvotes;
	}
	return votes;
});

Template.registerHelper("gh_downvote_count", function(websiteId) {
	var website = Websites.findOne({_id:websiteId});
	var votes = 0;
	if ((website) && (website.downvotes)) {
		votes = website.downvotes;
	}
	return votes;
});

Template.registerHelper("gh_comment_count", function(websiteId) {
	return Comments.find({websiteId: websiteId}).count();
});

Template.registerHelper("gh_show_warning", function() {
	if (Meteor.user()) {
		return "sr-only";
	} else {
		return "";
	}
});
