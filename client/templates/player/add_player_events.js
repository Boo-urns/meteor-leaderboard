Template.addPlayerForm.events({
    // events go here
    'submit form': function(e){
      e.preventDefault();
      var playerNameVar = e.target.playerName.value;

      Meteor.call('insertPlayerData', playerNameVar);
      e.target.playerName.value = '';


    },
  });