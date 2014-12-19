PlayersList = new Mongo.Collection('players');
if (Meteor.isClient) {
  Template.leaderboard.helpers({
    player: function(){
      return PlayersList.find({}, { sort: {score: -1, name: 1} });

    },
    numPlayers: function(){
      return PlayersList.find().count();
    },
    selectedClass: function(){
      var playerId = this._id;
      var selectedPlayer = Session.get('selectedPlayer'); // Session variable set in events 'click .player'
      if(playerId === selectedPlayer)
        return 'selected';
    },
    showSelectedPlayer: function(){
      var selectedPlayer = Session.get('selectedPlayer');
      return PlayersList.findOne(selectedPlayer);
    }
  });

  Template.leaderboard.events({
    'click .player': function(){
      var playerId = this._id;
      Session.set('selectedPlayer', playerId);
      //var selectedPlayer = Session.get('selectedPlayer');
      //PlayersList.update({_id: playerId}, {$set: {score: 100}});
    },
    'click .increment': function() {
      var selectedPlayer = Session.get('selectedPlayer');
      PlayersList.update(selectedPlayer, {$inc: {score: 5}});
    },
    'click .decrement': function() {
      var selectedPlayer = Session.get('selectedPlayer');
      PlayersList.update(selectedPlayer, {$inc: {score: -5}});
    }
  });
}

if (Meteor.isServer) {

  // Meteor.startup(function () {
  //   // code to run on server at startup
  // });
}
