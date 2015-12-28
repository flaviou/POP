Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function() { 
	Meteor.subscribe('globals');
	Meteor.subscribe('users');
	return Meteor.subscribe('entries'); 
  }
});
Router.route('/', function() {
	this.render('entriesList');
});
Router.route('/profileEdit', function() {
	this.render('profileEdit');
});
Router.route('/users', {
	name: 'usersList',
	template: 'usersList',
	data: function() {
		if (Roles.userIsInRole(Meteor.user(), ['admin'])) {
			Meteor.users.find();
		} else {
			if (Meteor.isClient) {
				Router.go('/');
				throwError('Access Denied');
			}
		}
	}
});

Router.route('/user/:id', {
  name: 'userEdit',
  template: 'userEdit',
  data: function() {return Meteor.users.findOne({_id: this.params.id}); }
});

Router.onBeforeAction('dataNotFound', {only: 'entryPage'});
