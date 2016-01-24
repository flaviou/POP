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

