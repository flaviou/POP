Template.entryItem.helpers({
	ownEntry: function() {
		return this.userId === Meteor.userId();  
	}
});