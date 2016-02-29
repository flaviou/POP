Schema = {};

Schema.Player = new SimpleSchema({
	age: {
		type: Number,
		optional: true
	},
	name: {
		type: String
	},
	number: {
		type: Number
	},
	teamID: {
		type: String
	},
	competition: {
		type: String
	},
	seasonGoals: {
		type: Number,
		optional: true
	},
	seasonAssists: {
		type: Number,
		optional: true
	},
	seasonPoints: {
		type: Number,
		optional: true
	},
	playoffGoals: {
		type: Number,
		optional: true
	},
	playoffAssists: {
		type: Number,
		optional: true
	},
	birthdate: {
		type: String,
		optional: true
	},
	position: {
		type: String,
		optional: true
	},
	id: {
		type: Number
	},
	twitterURL: {
		type: String,
		optional: true
	},
	twitterHandle: {
		type: String,
		optional: true
	},
	weight: {
		type: Number,
		optional: true
	},
	height: {
		type: String,
		optional: true
	},
	imageUrl: {
		type: String,
		optional: true
	},
	birthplace: {
		type: String,
		optional: true
	},
	age: {
		type: Number,
		optional: true
	}

});

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

