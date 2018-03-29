// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    const currUser = "" + context.params.user._id

    if (context.result.userID !== currUser) {
      const userID = context.result.userID

      //check if they're friends
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
        if (!data.data.length) {
          throw new Error('Not allowed to view this profile')
        }
      })
    }

    return context;
  };
};