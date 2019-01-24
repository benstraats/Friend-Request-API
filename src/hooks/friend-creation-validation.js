// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const { FeathersError } = require('@feathersjs/errors');

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    const currUser = "" + context.params.user._id
    const requestID = context.data.requestID

    await context.app.service('requests').get(requestID).then((data) => {
      if (currUser !== data.requestee) {
        throw new FeathersError('Not a valid request to fulfill', 'Invalid-Request', 400);
      }

      const otherUser = data.requester

      context.data = {
        user1: otherUser,
        user2: currUser
      }

    });

    //delete the request
    await context.app.service('requests').remove(requestID);

    return context;
  };
};
