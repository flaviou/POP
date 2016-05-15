Meteor.subscribe('myPicks');
Template.myPicks.events({
  "click .js-toggle-pick-form": function(event) {
    $("#pick_form_div").toggle('slow');
  },
  "click .js-delete": function() {
    Session.set("selectedPickId", this._id);
    Session.set("selectedPickName", this.pick_name);
    $("#pickDelete").modal("show");
  },
  "submit .js-save-pick-form": function(event) {
    event.preventDefault();
    if (Meteor.user()) {
      $(event.target.pick_name).prop('required', true);
      var name = event.target.pick_name.value;
      var players = [];
      selectedPlayers = Session.get("selectedPlayers");
      if (typeof selectedPlayers !== 'undefined') {
        selectedPlayers.forEach(function(index) {
          players.push(this.id);
        });
      }
      if (name) {
        Meteor.call('insertPick', {'pick_name': name, 'players': players});
        $("#btn-plus").click();
      }
    }
    return false;
  }
});

Template.myPickList.helpers({
  picks: function() {
    return Picks.find();
  }
});

Template.pickDelete.helpers({
  pick_name: function() {
    return Session.get('selectedPickName');
  }
});

Template.pickDelete.events({
  'click .js-del-confirm': function(){
    var pickId = Session.get("selectedPickId");
    Meteor.call('deletePick', pickId);
  }
})
