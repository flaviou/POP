Template.userItem.events({
	'click .js-del-user': function() {
		Session.set("selectedUser", this._id);
		$("#userDelete").modal("show");
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
      Meteor.users.update(this._id, {$set: {'profile.full_name': this.doc.profile.full_name}}, function(error, result) {
      });
      Router.go('/users');
  }
})

Template.userEdit.helpers({
  roleOptions: function() {
    return { 
      'admin': 'Admin',
      'editor':'Editor'
    };
  }
})
