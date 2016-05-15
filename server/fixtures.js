/*
if (Meteor.users.find().count() == 1) {
  var user = Meteor.users.findOne();
  Roles.addUsersToRoles(user.id, user.roles, 'admin');
}
*/
/*
Teams.remove({});
Players.remove({});
Globals.remove({});

var competition = 'NHL 2016';


if (Globals.find().count() == 0) {
  Globals.insert({
    competition: competition,
    phase:'1',
    current: 1
  });
}

if (Teams.find().count({competition:competition}) == 0) {
  var url = "http://www.nicetimeonice.com/api/teams";
  HTTP.call("GET", url, function(error, result){
    if (error) {
      console.log(error);
    }
    if (result) {
      var teamArr = result.data;
      var len = teamArr.length;
      for (var i=0; i < len; i++) {
        teamArr[i]['competition'] = competition;
        Teams.insert(teamArr[i], function(error, result){
          if (error) {
            console.log(error);
          }
          var team = Teams.findOne({_id: result});
          loadPlayers(team.teamID);
        });
      }    
    } 
  });
}

function loadPlayers(teamID) {
//console.log('Player list - ' + teamID);
  Players.remove({teamID:teamID});
  var url = "http://nhlwc.cdnak.neulion.com/fs1/nhl/league/teamroster/<teamID>/iphone/clubroster.json";
  HTTP.call("GET", url.replace('<teamID>', teamID), function(error, result){
    if (error) {
      console.log(error);
    }
    if (result) {
      var playerArr = result.data.goalie;
      var len = playerArr.length;
      for (var i=0; i < len; i++) {
        playerArr[i]['competition'] = competition;
        playerArr[i]['teamID'] = teamID;
//console.log(teamID + ' - ' + playerArr[i].id + ' - ' + playerArr[i].number + ' - ' + playerArr[i].name);
//        Players.insert(playerArr[i]);
        Players.upsert({
          id: playerArr[i].id,
        }, {
          $set: playerArr[i]
        });
      }
      playerArr = result.data.defensemen;
      len = playerArr.length;
      for (var i=0; i < len; i++) {
        playerArr[i]['competition'] = competition;
        playerArr[i]['teamID'] = teamID;
//console.log(teamID + ' - ' + playerArr[i].id + ' - ' + playerArr[i].number + ' - ' + playerArr[i].name);
//        Players.insert(playerArr[i]);
        Players.upsert({
          id: playerArr[i].id,
        }, {
          $set: playerArr[i]
        });
      }  
      playerArr = result.data.forwards;
      len = playerArr.length;
      for (var i=0; i < len; i++) {
        playerArr[i]['competition'] = competition;
        playerArr[i]['teamID'] = teamID;
//console.log(teamID + ' - ' + playerArr[i].id + ' - ' + playerArr[i].number + ' - ' + playerArr[i].name);
//        Players.insert(playerArr[i]);
        Players.upsert({
          id: playerArr[i].id,
        }, {
          $set: playerArr[i]
        });
      }
      url = 'http://nhlwc.cdnak.neulion.com/fs1/nhl/league/playerstatsline/20152016/2/<teamID>/iphone/playerstatsline.json';
      HTTP.call("GET", url.replace('<teamID>', teamID), function(error, result){
//console.log('Player stat - ' + teamID);
        if (error) {
          console.log(error);
        }
        if (result) {
          var playerArr = result.data.skaterData;
          var len = playerArr.length;
          for (var i=0; i < len; i++) {
            var id = playerArr[i]['id'];
            var playerStat = playerArr[i]['data'];
//console.log(teamID + ' - ' + id + ' - ' + playerStat);
            var stats = playerArr[i]['data'].split(',');
//        var assists = parseInt(stats[4]);
//console.log(assists);
/*
        Players.update({'id': id}, {$set : {
          'seasonGoals': parseInt(stats[4]),
          'seasonAssists': parseInt(stats[5]),
          'seasonPoints': parseInt(stats[6])
        }});
*/
/*
            Players.upsert({
              id: id,
            }, {$set: {
              'competition': competition,
              'number': parseInt(stats[0]),
              'seasonGoals': parseInt(stats[4]),
              'seasonAssists': parseInt(stats[5]),
              'seasonPoints': parseInt(stats[6])
            }});
          }  
        }
      });
    }
  });
}
*/
/*
  url = 'http://nhlwc.cdnak.neulion.com/fs1/nhl/league/playerstatsline/20152016/2/<teamID>/iphone/playerstatsline.json';
  HTTP.call("GET", url.replace('<teamID>', teamID), function(error, result){
console.log('Player stat - ' + teamID);
    if (error) {
      console.log(error);
    }
    if (result) {
      var playerArr = result.data.skaterData;
      var len = playerArr.length;
      for (var i=0; i < len; i++) {
        var id = playerArr[i]['id'];
        var playerStat = playerArr[i]['data'];
console.log(playerStat);
	var stats = playerArr[i]['data'].split(',');
//        var assists = parseInt(stats[4]);
//console.log(assists);
*/
/*
        Players.update({'id': id}, {$set : {
          'seasonGoals': parseInt(stats[4]),
          'seasonAssists': parseInt(stats[5]),
          'seasonPoints': parseInt(stats[6])
        }});
*/
/*
        Players.upsert({
          id: id,
        }, {$set: {
          'competition': competition,
          'number': parseInt(stats[0]),
          'seasonGoals': parseInt(stats[4]),
          'seasonAssists': parseInt(stats[5]),
          'seasonPoints': parseInt(stats[6])
        }});
      }
    }
  });
}
*/
