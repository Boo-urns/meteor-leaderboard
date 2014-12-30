Template.leaderboard.helpers({
    player: function(){
      var currentUserId = Meteor.userId();
      return PlayersList.find({}, {sort: {score: -1, name: 1} });

    },
    numPlayers: function(){
      var currentUserId = Meteor.userId();
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