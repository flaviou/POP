Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function() { 
	Meteor.subscribe('globals');
	return Meteor.subscribe('entries'); 
  }
});
Router.route('/', function() {
	this.render('entriesList');
});
Router.route('/profileEdit', function() {
	this.render('profileEdit');
});
Router.onBeforeAction('dataNotFound', {only: 'entryPage'});
