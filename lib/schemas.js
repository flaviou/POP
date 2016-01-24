Schema = {};

Schema.UserProfile = new SimpleSchema({
	full_name: {
		type: String
	}
});

Schema.User = new SimpleSchema({
	username: {
		type: String,
		optional: true
	},
	emails: {
		type: Array,
		optional: true
	},
	'emails.$': {
		type: Object
	},
	'emails.$.address': {
		type: String,
		regEx: SimpleSchema.RegEx.Email
	},
	'emails.$.verified': {
		type: Boolean
	},
	createdAt: {
		type: Date,
		autoValue: function(){
			if (this.isInsert) {
				return new Date();
			} else {
				this.unset();
			}
		}
	},
	profile: {
		type: Schema.UserProfile,
		optional: true
	},
	services: {
		type: Object,
		optional: true,
		blackbox: true
	},
	roles: {
		type: [String],
		optional: true
	},
	last_login: {
		type: Date,
		optional: true
	},
	updatedOn: {
		type: Date,
		optional: true,
		denyInsert: true,
		autoValue: function(){
			if (this.isUpdate) {
				return new Date();
			}
		}
	},
	updatedBy: {
		type: String,
		optional: true,
		denyInsert: true,
		autoValue: function() {
			if (this.isUpdate) {
				return this.userId;
			}
		}
	},
	heartbeat: {
		type: Date,
		optional: true
	}
});

Schema.Global = new SimpleSchema({
  competition: {
    type: String
  },
  phase: {
    type: String
  },
  current: {
    type: Number
  }
});

Globals.attachSchema(Schema.Global);

Meteor.users.attachSchema(Schema.User);

