Template.entryEdit.onCreated(function() {
	Session.set('entryEditErrors', {});
});
Template.entryEdit.helpers({
	errorMessage: function(field) {
		return Session.get('entryEditErrors')[field];
	},  
	errorClass: function (field) {
		return !! Session.get('entryEditErrors')[field] ? 'has-error' : '';  
	}
});
Template.entryEdit.events({
  'submit form': function(e) {
    e.preventDefault();

    var currentEntryId = this._id;

    var entryProperties = {
      name: $(e.target).find('[name=name]').val()
    }
    var errors = validateEntry(entryProperties);
    if (errors.name)
		return Session.set('entryEditErrors', errors);	
    Meteor.call('entryUpdate', this._id, entryProperties, function(error, result) {
		// display the error to the user and abort
		if (error)
			throwError(error.reason);
		// show this result but route anyway
		if (result.entryExists)
			throwError('There is already a team with the same name');		
		Router.go('entryPage', {_id: result._id});
	});
  },

  'click .delete': function(e) {
    e.preventDefault();

    if (confirm("Delete this entry?")) {
      var currentEntryId = this._id;
      Entries.remove(currentEntryId);
      Router.go('entriesList');
    }
  }
});