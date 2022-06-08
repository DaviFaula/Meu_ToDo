Meteor.publish('users',  function ({ userIds }) {
    // Validate the arguments to be what we expect

    // Select only the users that match the array of IDs passed in
    const selector = {
      _id: { $in: userIds }
    };
  
  
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
  
    return Meteor.users.find(selector);
  });