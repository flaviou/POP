Meteor.subscribe('myPicks');

Template.myPicks.events({
  "click .js-toggle-pick-form": function(event) {
    $("#pick_form").toggle('slow');
  },
  "submit .js-save-pick-form": function(event) {
    event.preventDefault();
    if (Meteor.user()) {
      var name = event.target.pick_name.value;
      Meteor.call('insertPick', {'pick_name': name});
      $("#btn-plus").click();
    }
    return false;
  }
});

Template.myPickList.helpers({
  picks: function() {
    return Picks.find();
  }
});
