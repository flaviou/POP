if (Meteor.isClient) {
	console.log('Msg from client');
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
	console.log('Msg from server');
  });
}
