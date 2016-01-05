Entries = new Mongo.Collection('entries');
/*Entries.allow({
	update: function(userId, entry) { return ownsDocument(userId, entry); },
	remove: function(userId, entry) { return ownsDocument(userId, entry); },
});
Entries.deny({
	update: function(userId, entry, fieldNames) {
		// may only edit the following field:
		return (_.without(fieldNames, 'name').length > 0);  
	}
});
Entries.deny({
	update: function(userId, entry, fieldNames, modifier) {
		var errors = validateEntry(modifier.$set);
		return errors.name;  
	}
});
*/
Meteor.methods({
	entryInsert: function(entryAttributes) {
		check(Meteor.userId(), String);
		check(entryAttributes, {
			name: String
		});
		var errors = validateEntry(entryAttributes);    
		if (errors.name)
			throw new Meteor.Error('invalid-entry', error.name);
/*	
		var entryWithSameName = Entries.findOne({name: entryAttributes.name});
		if (entryWithSameName) {
			return {
				entryExists: true,
				_id: entryWithSameName._id
			}
		}	
*/	
		var user = Meteor.user();
		var entry = _.extend(entryAttributes, {
			userId: user._id,
			owner: user.emails[0].address,
			created: new Date(),
			active: false,
			pickCount: 0,
			// Need to include season based on global settings
			year: 2016
		});
		var entryId = Entries.insert(entry);
		return {
			_id: entryId
		};  
	},
	entryUpdate: function(entryId, entryAttributes) {
		check(entryAttributes, {
			name: String
		});
		var entryWithSameName = Entries.findOne({name: entryAttributes.name});
		if (entryWithSameName) {
			return {
				entryExists: true,
				_id: entryWithSameName._id
			}
		}
		Entries.update(entryId, {$set: entryAttributes});
		return {
			_id: entryId
		};  
	}
});

validateEntry = function (entry) {
	var errors = {};
	if (!entry.name)
		errors.name = "Please fill in the team's name.";
	return errors;
}

	
