Meteor.publish('globals', function(){
  return Globals.find({current:1});
//  return Globals.find();
});

Meteor.publish('myPicks', function() {
  var competition = Globals.findOne({current:1}).competition;
  return Picks.find({owner: this.userId, competion: competition});
});

Meteor.publish('players', function(query, projection){
  var competition = Globals.findOne({current:1}).competition;
  if (!query) {
    query = {};
  }
  query.competition = competition;
  if (projection) {
    return Players.find(query, projection);
  } else {
    return Players.find(query);
  }
});

Meteor.publish('teams', function(){
  var competition = Globals.findOne({current:1}).competition;
  return Teams.find({'competition': competition});
//  return Teams.find({});
});

Meteor.publish('users', function(query) {
  if (!query) {
    query = {};
  }
//  if (Roles.userIsInRole(this.userId, ['admin'])) {
    return Meteor.users.find(query);
//  } else {
//    return Meteor.users.find(query,{fields: {'profile.full_name':1}});
//    return Meteor.users.find({$and: [{_id:this.userId}, query]},{fields: {'profile.full_name':1}});
//  }
});

