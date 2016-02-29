Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound'
});

Router.route('/', {
  name: 'myPicks',
  template: 'myPicks',
  loadingTemplate: 'loading',
  waitOn: function() {
    return Meteor.subscribe('myPicks');
  }
});

Router.route('/playersTable', {
  name: 'playersTable',
  template: 'playersTable',
  loadingTemplate: 'loading',
});
Router.route('/playersGraph', {
  name: 'playersGraph',
  template: 'playersGraph',
  loadingTemplate: 'loading',
});
Router.route('/standings', {
  name: 'standings',
  template: 'standings',
  loadingTemplate: 'loading',
});

Router.route('/profileEdit',{
  name: 'profileEdit',
  template: 'profileEdit',
  loadingTemplate: 'loading',
});

Router.route('/users', {
//  name: 'usersList',
//  template: 'usersList',
  name: 'usersTable',
  template: 'usersTable',
  loadingTemplate: 'loading',
  waitOn: function() {
    if (Roles.userIsInRole(Meteor.userId(), ['admin'])) {
      return Meteor.subscribe('users');
    } else {
      Router.go('/');
      throwError('Access Denied');
    }
  },
});

Router.route('/user/:id', {
  name: 'userEdit',
  template: 'userEdit',
//  loadingTemplate: 'loading',
  data: function() {
//console.log(this.params.id);
    var doc = Meteor.users.findOne({_id: this.params.id});
//console.log(doc);
    if (doc) {
      return doc;
    } else {
      Router.go('/');
      throwError('Access Denied');
    }
  },
  waitOn: function() {
    return Meteor.subscribe('users', {_id: this.params.id});
  }
//  data: function() {return Meteor.users.findOne({_id: this.params.id}); }
});

Router.route('/settings', {
  name: 'settings',
  template: 'globalEdit',
  loadingTemplate: 'loading',
  waitOn: function() {
    if (Roles.userIsInRole(Meteor.userId(), ['admin'])) {
      return Meteor.subscribe('globals');
    } else {
      Router.go('/');
      throwError('Access Denied');
    }
  }
/*
  data: function() {
    if (Roles.userIsInRole(Meteor.userId(), ['admin'])) {
      return Globals.findOne();
    } else {
      if (Meteor.isClient) {
        Router.go('/');
	throwError('Access Denied');
      }
    }
  }
*/
});

Router.onBeforeAction('dataNotFound', {only: 'myPicks'});
