Meteor.methods({
  insertPlayerData: function(playerName){
      var currentUserId = Meteor.userId();
       PlayersList.insert({
          name: playerName,
          score: 0,
          createdBy: currentUserId
      });
  },
  removePlayerData: function(player){
    PlayersList.remove(player);
  },
  modifyPlayerScore: function(player, score){
    PlayersList.update(player, {$inc: {score: score}})
  },
});