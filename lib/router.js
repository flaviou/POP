Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function() { 
	Meteor.subscribe('users');
	return Meteor.subscribe('globals'); 
  }
});
Router.route('/', function() {
	this.render('mainTabs');
});
Router.route('/standings', {
	name: 'standings',
	template: 'standings'
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
