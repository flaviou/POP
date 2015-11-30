Template.profileEdit.helpers({
	email: function(){
		if (Meteor.user()) {
			return Meteor.user().emails[0].address;
		} else {
			return "";
		}
	},
	full_name: function() {
		if (Meteor.user()) {
			return Meteor.user().profile.full_name;
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
		Meteor.users.update({_id: user_id},{$set: {'profile.full_name': full_name}});
	},
});