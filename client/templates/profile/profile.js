Template.profileEdit.helpers({
	_id: function() {
		if (Meteor.user()) {
			return Meteor.userId();
		} else {
			return "";
		}
	}
});

Template.profileEdit.events({
	'submit form': function(event){
		event.preventDefault();
		var user_id = Meteor.userId();
		var full_name = event.target.fullName.value;
		Meteor.users.update(user_id, {$set: {'profile.full_name': full_name}}, function(error, result) {
			Router.go('/');
		});
	},
});
