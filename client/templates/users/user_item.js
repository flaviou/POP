Template.userItem.events({
	'click .js-del-user': function() {
		Session.set("selectedUser", this._id);
		$("#userDelete").modal("show");
	},
	'click .js-edt-user': function() {
		Session.set("selectedUser", this._id);
		$("#userEdit").modal("show");
	}
});
  
Template.userDelete.events({
	'click .js-del-user-confirm':function(){
		var user_id = Session.get("selectedUser");
		Meteor.call('deleteUser', user_id);
	}
})

Template.userEdit.events({
	'submit form': function(event){
		event.preventDefault();
		var user_id = Session.get("selectedUser");
		var full_name = event.target.fullName.value;
		Meteor.users.update(user_id, {$set: {'profile.full_name': full_name}}, function(error, result) {
		}); 
		$("#userEdit").modal("hide");
	}
})
