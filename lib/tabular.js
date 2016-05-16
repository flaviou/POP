TabularTables = {};

TabularTables.Users = new Tabular.Table({
  name: "Users",
  collection: Meteor.users,
  columns: [
    {data: "profile.full_name", title: "Name"},
    {data: "emails[0].address", title: "Email Address"},
    {data: "createdAt", title: "Created On"},
    {data: "last_login", title: "Last Login"},
    {data: "updatedOn", title: "Last Update On"},
    {data: "updatedBy", visible: false},
    {data: "userUpdatedBy()", title: "Last Update By"},
    {title: "Edit", tmpl: Meteor.isClient && Template.editIcon},
    {title: "Delete", tmpl: Meteor.isClient && Template.deleteIcon}
  ]
});
TabularTables.Players = new Tabular.Table({
  name: "Players",
  collection: Players,
  columns: [
    {data: "teamID", title: "Team"},
    {data: "number", title: "Number"},
    {data: "name", title: "Name"},
    {data: "position", title: "Position"},
    {data: "seasonGoals", title: "Goals"},
    {data: "seasonAssists", title: "Assists"},
    {data: "seasonPoints", title: "Points"}
  ]
});
TabularTables.Picks = new Tabular.Table({
  name: "Picks",
  collection: Picks,
  columns: [
/*
    {data: "owner", title: "Owner",
      render: function(val, type, doc) {
        var user = Meteor.users.findOne({_id: val});
        if (user) {
          return user.profile.full_name;
        } else {
          return "Anynymous";
        }
      }
    },
*/
    {data: "pick_name", title: "Entry"},
    {data: "players", title: "Number of Players",
      render: function(val, type, doc) {
        return val.length;
      }
    },
    {data: "totalCost()", title: "Total Cost",
      render: function(val, type, doc) {
        var total  = 0;
        len = doc.players.length;
        for (var i=0; i  < len; i++) {
          player = Players.findOne({id: parseInt(doc.players[i])});
          if (player.seasonPoints) {
            total += player.seasonPoints;
          }
        };
        return total;
      }
    }
/*
    {data: "totalGoals", title: "Goals",
      render: function(val, type, doc) {
        return 0;
      }
    },
    {data: "totalAssists", title: "Assists",
      render: function(val, type, doc) {
        return 0;
      }
    },
    {data: "totalPoints", title: "Points",
      render: function(val, type, doc) {
        return 0;
      }
    }
*/
  ]
});
