

Meteor.publish('users', function publishUsers(userId) {
    // Validate the arguments to be what we expect

    const selector =  userId;
  
  
    const options = {
      fields: {
                 username: 1, 
                 email: 1,
                 birthDate: 1,
                 ProfilePicture: 1,
                 job:1,
                 sexo:1
                }
    };
  
    return Meteor.users.find({_id : selector},options);
  });