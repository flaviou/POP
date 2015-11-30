Template.info.helpers({
  globals: function () {
	  return Globals.findOne();
  }
});

Template.info.rendered = function() {
  $('[data-toggle="popover"]').popover();
}