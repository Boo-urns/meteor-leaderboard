//UserAccounts = new Mongo.Collection('users');
PlayersList  = new Mongo.Collection('players');

if (Meteor.isClient) {
  Meteor.subscribe('thePlayers');
  Meteor.subscribe('userData');
  Meteor.subscribe('allUserData');

  Template.user.helpers({
    photo: function(){

      console.log(Meteor.user());

      //var currentUserId = Meteor.userId();
      var user = Meteor.user();
      var services = user.services;


      if('google' in services) {
        return services.google.picture;
      } else {
        return 'http://placehold.it/350x350';
      }
     
    },

    name: function() {
      var currentUserId = Meteor.userId();
      var userInfo = Meteor.users.find(currentUserId).fetch();

      return userInfo[0].services.google.name;
    }
  });

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

  Template.leaderboard.events({
    'click .player': function(){
      var playerId = this._id;
      Session.set('selectedPlayer', playerId);
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

      e.target.playerName.value = '';
    },
  });
}

if (Meteor.isServer) {
  Meteor.publish('thePlayers', function(){
    var currentUserId = this.userId;
    return PlayersList.find({createdBy: currentUserId});
  });

  // Meteor.publish('theUser', function(){
  //   var currentUserId = this.userId;
  //   return Meteor.users.find(currentUserId);
  // });

  Meteor.publish("userData", function () {
    return Meteor.users.find({_id: this.userId},
        {fields: {'services': 1}});
    //return Meteor.users.find(this.userId);
  });
  Meteor.publish("allUserData", function () {
    return Meteor.users.find({}, {fields: {'nested.things': 1}});
  });


  // Meteor.startup(function () {
  //   // code to run on server at startup
  // });
}
