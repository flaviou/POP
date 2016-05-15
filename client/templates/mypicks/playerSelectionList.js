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
    id = $(event.target).attr("id");
    name = $(event.target).attr("playerName");
    var selectedPlayer = $(event.target)[0].innerText.split(' ');
    number = selectedPlayer[2];
    team = selectedPlayer[0];
    cost = selectedPlayer[6];
    if (typeof selectedPlayers !== 'undefined') {
      selectedPlayers = Session.get("selectedPlayers");
      selectedPlayers = $.grep(selectedPlayers, function(e){return e.id != id;});
    } else {
      selectedPlayers=[];
      index = 0;
    }
    if ($(event.target)[0].classList.contains('active')) {
      if (n > 0) {
        Session.set("numOfPlayers", n - 1);
      }
    } else {
      Session.set("numOfPlayers", n + 1);
      selectedPlayers.push({'id': id, 'team': team, 'name': name, 'number': number, 'cost': cost});
    }
    Session.set("selectedPlayers", selectedPlayers);
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
