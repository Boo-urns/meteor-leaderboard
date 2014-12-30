Meteor.publish('thePlayers', function(){
  var currentUserId = this.userId;
  return PlayersList.find({createdBy: currentUserId});
});

Meteor.publish("userData", function () {
  return Meteor.users.find({_id: this.userId},
      {fields: {'services': 1}});
  //return Meteor.users.find(this.userId);
});
Meteor.publish("allUserData", function () {
  return Meteor.users.find({}, {fields: {'nested.things': 1}});
});