//Meteor.subscribe('globals');
//Meteor.subscribe('teams');
//Meteor.subscribe('players');

Template.globalEdit.events({
  'submit form': function(event){
    event.preventDefault();
//    Globals.update(this.doc._id);
//    Router.go('/settings');
  }
})

Template.globalEdit.helpers({
  phaseOptions: function() {
    return {
      '1': 'Pick teams',
      '2': 'Grace period',
      '3': 'Play-off'
    };
  },
  doc: function() {
    var doc = Globals.findOne();
    return doc;
  }
})
