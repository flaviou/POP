Template.vis_options.rendered = function(){
  initBlobVis();
};

Template.vis_options.helpers({
  'teams': function() {
    Meteor.subscribe('teams');
    return Teams.find();
  }
});

Template.vis_options.events({

  'click .js-vis-goals': function(event) {
    event.preventDefault();
    Session.set('feature', 'seasonGoals');
    var graphType = Session.get('graphType');
    if (!graphType) {
      graphType = 'bubble';
    }
    switch (graphType) {
      case 'bubble':
        initBlobVis();
        break;
      case 'bar':
        init2dVis();
        break;
      case '3D':
        init3dVis();
        break;
    }
  },
  'click .js-vis-assists': function(event) {
    event.preventDefault();
    Session.set('feature', 'seasonAssists');
    var graphType = Session.get('graphType');
    if (!graphType) {
      graphType = 'bubble';
    }
    switch (graphType) {
      case 'bubble':
        initBlobVis();
        break;
      case 'bar':
        init2dVis();
        break;
      case '3D':
        init3dVis();
        break;
    }
  },
  'click .js-vis-points': function(event) {
    event.preventDefault();
    Session.set('feature', 'seasonPoints');
    var graphType = Session.get('graphType');
    if (!graphType) {
      graphType = 'bubble';
    }
    switch (graphType) {
      case 'bubble':
        initBlobVis();
        break;
      case 'bar':
        init2dVis();
        break;
      case '3D':
        init3dVis();
        break;
    }
  },
  'click .js-vis-3d': function(event) {
    event.preventDefault();
    Session.set('graphType', '3D');
    init3dVis();
  },
  'click .js-vis-bar': function(event) {
    event.preventDefault();
    Session.set('graphType', 'bar');
    init2dVis();
  },
  'click .js-vis-bubble': function(event) {
    event.preventDefault();
    Session.set('graphType', 'bubble');
    initBlobVis();
  },

});

var visjsobj;
var teamArr = new Array();

function init2dVis() {
  var feature = Session.get('feature');
  if (!feature) {
    feature = 'seasonPoints';
  }
  var teams = Teams.find({});
  var teamCount = 0;
  var counter = 0;
  var nodes = new Array();
  var edges = new Array();
  var ind = 0;
  var indEdge = 0;
  teams.forEach(function(team){
    var filter = {sort: {}, limit: {}};
    filter.sort[feature] = -1;
    filter.limit = 3; 
    var items = Players.find({'teamID':team.teamID}, filter);
    var label = 'ind:' + ind;
    var value = 0;
    var teamNode = ind;
    nodes[ind] = {
      id: ind,
      label: team.teamID,
      value: 100,
      shape: 'box',
      color: 'red'
    };
//console.log(nodes[ind]);
    ind++;
    items.forEach(function(item){
      value = item[feature];
      label = item.name + ' (' + value + ')';
      nodes[ind] = {
        id: ind,
        label: label,
        value: value,
        shape: 'ellipse',
        color: 'blue'
      };
//console.log(nodes[ind]);
      edges[indEdge] = {
        from: teamNode,
        to: ind
      };
//console.log(edges[indEdge]);
      ind++;
      indEdge++;
    });
  });
  var data = {
    nodes: nodes,
    edges: edges
  };
  var options = {
    nodes: {
      shape: 'dot'
    }
  };
  container = document.getElementById('visjs');
  visjsobj = new vis.Network(container, data, options);
}

function xLabel(x) {
  return teamArr[x];
}
function init3dVis() {
  var feature = Session.get('feature');
  if (!feature) {
    feature = 'seasonPoints';
  }
  var data = new vis.DataSet();
  Meteor.subscribe('teams');
  var teams = Teams.find({});
  var teamCount = 0;
  var counter = 0;
  teams.forEach(function(team){
    teamCount++;
    teamArr[teamCount] = team.teamID;
    var filter = {sort: {}, limit: {}};
    filter.sort[feature] = -1;
    filter.limit = 10; 
    var items = Players.find({'teamID': team.teamID}, filter);
    var ind = 0;
    var label = 'ind:' + ind;
    var value = 0;
    items.forEach(function(item){
      ind++;
      value = item[feature];
      if ((value) && (value > 0)) {
        label = item.teamID + ' - ' + item.name + ' (' + value + ')';
      } else {
        label = '';
        value = 0;
      }
      counter++;
      data.add({id:counter++,x:teamCount,y:ind,z:value,style:value});
    })
  });
  var options = {
        width:  '100%',
        height: '100%',
        style: 'bar',
        showPerspective: true,
        showGrid: true,
        showShadow: false,
        keepAspectRatio: true,
        verticalRatio: 0.5,
        xValueLabel: xLabel,
        xStep: 1,
  };
  container = document.getElementById('visjs');
  visjsobj = new vis.Graph3d(container, data, options);
}

function initBlobVis() {
/*
  if (visjsobj != undefined) {
    visjsobj.destroy();
  }
*/
  var feature = Session.get('feature');
  if (!feature) {
    feature = 'seasonPoints';
  }
//console.log(feature);
//  var feature = 'seasonPoints';
  var filter = {sort: {}, limit: {}};
  filter.sort[feature] = -1;
  filter.limit = 50; 
  var items = Players.find({}, filter);
  var nodes = new Array();
  var ind = 0;
  var label = 'ind:' + ind;
  var value = 0;
  items.forEach(function(item){
    value = item[feature];
    label = item.teamID + ' - ' + item.name + ' (' + value + ')';
    nodes[ind] = {
      id: ind,
      label: label,
      value: value
    };
    ind++;
  });
  var edges = [];
  var data = {
    nodes: nodes,
    edges: edges
  };
  var options = {
    nodes: {
      shape: 'dot'
    }
  };
  container = document.getElementById('visjs');
  visjsobj = new vis.Network(container, data, options);
}

