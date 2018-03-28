// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    const userID = context.params.query.userID;

    if (context.params.user !== undefined && context.params.user !== null) {
      const currUser = "" + context.params.user._id
      
      await context.app.service('friends').find({
        query: {
          $or: [{
            user1: userID,
            user2: currUser
          }, {
            user1: currUser,
            user2: userID
          }]
        }
      }).then((data) => {
        if (data.data.length) {
          throw new Error('Users are not friends.');
        }
      })
      
    }

    

    return context;
  };
};
