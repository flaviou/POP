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
