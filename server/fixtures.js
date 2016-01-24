/*
Teams.remove({});
Players.remove({});
Globals.remove({});
*/
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
        Players.insert(playerArr[i]);
      }
      playerArr = result.data.defensemen;
      len = playerArr.length;
      for (var i=0; i < len; i++) {
        playerArr[i]['competition'] = competition;
        playerArr[i]['teamID'] = teamID;
        Players.insert(playerArr[i]);
      }  
      playerArr = result.data.forwards;
      len = playerArr.length;
      for (var i=0; i < len; i++) {
        playerArr[i]['competition'] = competition;
        playerArr[i]['teamID'] = teamID;
        Players.insert(playerArr[i]);
      }
    }
  });
}

