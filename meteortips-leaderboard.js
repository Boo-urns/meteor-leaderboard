PlayersList = new Mongo.Collection('players');
if (Meteor.isClient) {
  Template.leaderboard.helpers({
    player: function(){
      return PlayersList.find({}, { sort: {name: 1} });

    },
    otherHelperFunc: function() {
      return 'Some other function';
    },
    numPlayers: function(){
      return PlayersList.find().count();
    }
  });
}

if (Meteor.isServer) {

  // Meteor.startup(function () {
  //   // code to run on server at startup
  // });
}
