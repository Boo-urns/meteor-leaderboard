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