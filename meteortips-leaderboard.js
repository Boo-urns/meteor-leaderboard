//UserAccounts = new Mongo.Collection('users');
PlayersList  = new Mongo.Collection('players');

if (Meteor.isClient) {
  Template.leaderboard.helpers({
    player: function(){
      var currentUserId = Meteor.userId();
      return PlayersList.find({createdBy: currentUserId}, 
                              {sort: {score: -1, name: 1} });

    },
    numPlayers: function(){
      var currentUserId = Meteor.userId();
      return PlayersList.find({createdBy: currentUserId}).count();
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
    'click .remove': function(){
      var selectedPlayer = Session.get('selectedPlayer');
      PlayersList.remove(selectedPlayer);
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


  Template.addPlayerForm.events({
    // events go here
    'submit form': function(e){
      e.preventDefault();
      var playerNameVar = e.target.playerName.value;
      var currentUserId = Meteor.userId();
      PlayersList.insert({
        name: playerNameVar,
        score: 0,
        createdBy: currentUserId
      });
    },
  });
}

if (Meteor.isServer) {

  // Meteor.startup(function () {
  //   // code to run on server at startup
  // });
}
