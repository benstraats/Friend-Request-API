// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    const currUser = "" + context.params.user._id
    const requestID = context.data.requestID

    await context.app.service('requests').get(requestID).then((data) => {
      if (currUser !== data.requestee) {
        throw new Error("Not a valid request to fulfill")
      }

      const otherUser = data.requester

      //delete the request
      await context.app.service('requests').remove(requestID);

      context.data = {
        user1: targetUser,
        user2: currUser
      }

    });

    return context;
  };
};
