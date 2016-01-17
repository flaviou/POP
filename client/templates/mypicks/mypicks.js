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
      var list = $('.list-right ul li');
      var players = [];
      list.each(function(index) {
        players.push(this.id);
      });
      if (name) {
        Meteor.call('insertPick', {'pick_name': name, 'players': players});
        // reset form and close
        var e = $.Event('keyup');
        e.keyCode = 27;
        $(".search-right-list").trigger(e); // empty the search boxes
        e = $.Event('keyup');
        e.keyCode = 27;
        $(".search-left-list").trigger(e);
        var $checkBoxRight = $(".select-all-right");
        if ($checkBoxRight.hasClass("selected")) { // if it is check, uncheck it
          $checkBoxRight.click();
        }
        $checkBoxRight.click(); // check select all
        $(".move-left").click();
        $("#pick_form").trigger("reset");
        $checkBoxRight.click(); // uncheck select all
        var $checkBoxLeft = $(".select-all-left");
        if (!$checkBoxLeft.hasClass("selected")) {
          $checkBoxLeft.click();
        }
        $checkBoxLeft.click(); // uncheck select all
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
