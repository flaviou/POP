Schema = {}

Globals = new Mongo.Collection('globals');

Globals.allow({
  update: function(userId, doc) {
    return (Roles.userIsInRole(userId, 'admin'));
  }
});

Schema.Global = new SimpleSchema({
  competition: {
    type: String
  },
  phase: {
    type: String
  }
});

Globals.attachSchema(Schema.Global);
