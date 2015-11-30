Template.entrySubmit.events({
  'submit form': function(e) {
    e.preventDefault();

    var entry = {
      name: $(e.target).find('[name=name]').val()
    };
    var errors = validateEntry(entry);
    if (errors.name)
		return Session.set('entrySubmitErrors', errors);
    Meteor.call('entryInsert', entry, function(error, result) {
		// display the error to the user and abort
		if (error)
			return throwError(error.reason);
		// show this result but route anyway
		if (result.entryExists)
			throwError('There is already a team with the same name');		
		Router.go('entryPage', {_id: result._id});
	});
  }
});

Template.entrySubmit.onCreated(function() {
	Session.set('entrySubmitErrors', {});
});

Template.entrySubmit.helpers({
	errorMessage: function(field) {
		return Session.get('entrySubmitErrors')[field];
	},
	errorClass: function (field) {
		return !!Session.get('entrySubmitErrors')[field] ? 'has-error' : '';
}});