Meteor.methods({
  deleteUser: function (targetUserId) {
    check(targetUserId, String);
    var loggedInUser = Meteor.userId();
    if (!loggedInUser || !Roles.userIsInRole(loggedInUser, ['admin'])) {
      throw new Meteor.Error(403, "Access Denied");
    };
    Meteor.users.remove({_id: targetUserId});
  },
  updateUser: function(targetUserId, doc) {
    check(targetUserId, String);
    var loggedInUser = Meteor.userId();
    if (((loggedInUser) && (loggedInUser == targetUserId)) || Roles.userIsInRole(loggedInUser, ['admin'])) {
      Meteor.users.update(targetUserId, doc);
    } else {
      throw new Meteor.Error(403, "Access Denied");
    }
  },
  reloadPlayers: function() {
    Players.remove({});
    var globals = Globals.findOne();
    var teams = Teams.find({competition:globals.competition});
    teams.forEach(function(team) {
      var url = "http://nhlwc.cdnak.neulion.com/fs1/nhl/league/teamroster/<teamID>/iphone/clubroster.json";
      HTTP.call("GET", url.replace('<teamID>', team.teamID), function(error,result){
        if (error) {
          console.log(error);
        }
        if (result) {
          var playerArr = result.data.goalie;
          var len = playerArr.length;
          for (var i=0; i < len; i++) {
            playerArr[i]['competition'] = globals.competition;
            playerArr[i]['teamID'] = team.teamID;
            Players.insert(playerArr[i]);
          }
          var playerArr = result.data.defensemen;
          var len = playerArr.length;
          for (var i=0; i < len; i++) {
            playerArr[i]['competition'] = globals.competition;
            playerArr[i]['teamID'] = team.teamID;
            Players.insert(playerArr[i]);
          }
          var playerArr = result.data.forwards;
          var len = playerArr.length;
          for (var i=0; i < len; i++) {
            playerArr[i]['competition'] = globals.competition;
            playerArr[i]['teamID'] = team.teamID;
            Players.insert(playerArr[i]);
          }
        }
      });
    });
  },
  resetStats: function() {   
    var globals = Globals.findOne();
    Players.update({'competition': globals.competition}, {$set: {
              'seasonGoals': 0,
              'seasonAssists': 0,
              'seasonPoints': 0
            }},
            {multi:true});
  },
  reloadStats: function() {   
    var globals = Globals.findOne();
    var teams = Teams.find({competition:globals.competition});
    teams.forEach(function(team) {
      var url = "http://nhlwc.cdnak.neulion.com/fs1/nhl/league/playerstatsline/20152016/2/<teamID>/iphone/playerstatsline.json";
      HTTP.call("GET", url.replace('<teamID>', team.teamID), function(error,result){
        if (error) {
          console.log(error);
        }
        if (result) {
          var playerArr = result.data.skaterData;
          var len = playerArr.length;
          for (var i=0; i < len; i++) {
            var id = playerArr[i]['id'];
            var stats  = playerArr[i]['data'].split(',');
            Players.update({'id': id}, {$inc: {
              'seasonGoals': parseInt(stats[4]),
              'seasonAssists': parseInt(stats[5]),
              'seasonPoints': parseInt(stats[6])
            }});
          }
        }
      });
    });
  }
});
