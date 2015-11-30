Template.entryPage.helpers({
	picks: function() {
		return Picks.find({entryId: this._id});
	},
	ownEntry: function() {
		return this.userId === Meteor.userId();  
	}
});