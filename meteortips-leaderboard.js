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
    },
    selectedClass: function(){
      var playerId = this._id;
      var selectedPlayer = Session.get('selectedPlayer');
      if(playerId === selectedPlayer)
        return 'selected';
    }
  });

  Template.leaderboard.events({
    'click .player': function(){
      var playerId = this._id;
      Session.set('selectedPlayer', playerId);
      var selectedPlayer = Session.get('selectedPlayer');
      PlayersList.update({_id: playerId}, {$set: {score: 100}});
    }
  });
}

if (Meteor.isServer) {

  // Meteor.startup(function () {
  //   // code to run on server at startup
  // });
}
