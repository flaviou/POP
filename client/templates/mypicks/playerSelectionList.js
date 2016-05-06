Meteor.subscribe('players', {}, {teamID:1, name:1, number:1, seasonPoints:1});

Template.playerSelectionList.helpers({
  players: function() {
    return Players.find({}, {sort:{teamID:1, name:1}});
  }
});

Template.playerSelectionList.events({
  'click .list-group .list-group-item': function(event) {
    n = Session.get("numOfPlayers");
    n = n ? n : 0;
console.log($(event.target));
console.log($(event.target).attr("id"));
console.log($(event.target).attr("playerName"));
/*
console.log($(event.target));
selectedPlayer = $(event.target)[0].innerText.split(' ');
console.log(selectedPlayer);
team = selectedPlayer[0];
name = selectedPlayer[2];
number = selectedPlayer[4];
cost = selectedPlayer[5];
selectedPlayers = Session.get("selectedPlayers");
if (selectedPlayers) {
  index = $.grep(selectedPlayers, function(e){return e.name = name;});
} else {
  selectedPlayers=[];
  index = 0;
}
console.log(index);

    if ($(event.target)[0].classList.contains('active')) {
      if (n > 0) {
        Session.set("numOfPlayers", n - 1);
      }
      if (index > 0) {
        Session.set("selectedPlayers", selectedPlayers.splice(index));
      }
    } else {
      Session.set("numOfPlayers", n + 1);
      if (index == 0) {
        Session.set("selectedPlayers", selectedPlayers.push({'team': team, 'name': name, 'number': number, 'cost': cost}));
      }
    }
*/
    $(event.target).toggleClass('active');
  },
  'click .dual-list .selector': function(event) {
    var $checkBox = $(event.target).closest('.selector');
    if (!$checkBox.hasClass('selected')) {
      $checkBox.addClass('selected').closest('.well').find('ul li:not(.active):visible').addClass('active');
      $checkBox.children('i').removeClass('glyphicon-unchecked').addClass('glyphicon-check');
    } else {
      $checkBox.removeClass('selected').closest('.well').find('ul li.active:visible').removeClass('active');
      $checkBox.children('i').removeClass('glyphicon-check').addClass('glyphicon-unchecked');
    }
  },
  'keyup .search-dual-list': function (event) {
    var code = event.keyCode || event.which;
    if (code == '9') return;
    if (code == '27') $(event.target).val(null);
    var $rows = $(event.target).closest('.dual-list').find('.list-group li');
    var val = $.trim($(event.target).val()).replace(/ +/g, ' ').toLowerCase();
    $rows.show().filter(function () {
      var text = $(this).text().replace(/\s+/g, ' ').toLowerCase();
      return !~text.indexOf(val);
    }).hide();
  }
});
