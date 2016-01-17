Meteor.subscribe('players', {});

Template.dualList.helpers({
  players: function() {
    return Players.find({}, {sort:{teamID:1, name:1}});
  }
});

Template.dualList.events({
  'click .list-group .list-group-item': function(event) {
    $(event.target).toggleClass('active');
  },
  'click .list-arrows button': function(event) {
    event.preventDefault();
    var $button = $(event.target).closest('.btn');
    var actives = '';
    if ($button.hasClass('move-left')) {
      actives = $('.list-right ul li.active');
      actives.clone().prependTo('.list-left ul');
      actives.remove();
    } else if ($button.hasClass('move-right')) {
      actives = $('.list-left ul li.active');
      actives.clone().prependTo('.list-right ul');
      actives.remove();
    }
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
