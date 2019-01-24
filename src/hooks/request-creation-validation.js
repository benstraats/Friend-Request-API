// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const { FeathersError } = require('@feathersjs/errors');

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    const currUser = "" + context.params.user._id

    //Check request has a requestee
    if(!context.data.requesteeID) {
      throw new FeathersError('A request must have a requestee', 'Bad-Request', 400);
    }

    const requestedUser = context.data.requesteeID.trim();

    //Check not requesting themselves
    if (currUser === requestedUser) {
      throw new FeathersError('Can\'t request themself.', 'Not-Allowed', 403);
    }

    //Check target is valid
    await context.app.service('users').get(requestedUser)

    //check not friends
    await context.app.service('friends').find({
      query: {
        $or: [{
          user1: requestedUser,
          user2: currUser
        }, {
          user1: currUser,
          user2: requestedUser
        }]
      }
    }).then((data) => {
      if (data.data.length) {
        throw new FeathersError('Users are already friends.', 'Not-Allowed', 403);
      }
    })

    await context.service.find({
      query: {
        $or: [{
          requestee: requestedUser,
          requester: currUser
        }, {
          requestee: currUser,
          requester: requestedUser
        }]
      }
    }).then((data) => {
      if (data.data.length) {
        throw new FeathersError('There is already a request between users', 'Not-Allowed', 403);
      }
    })

    context.data = {
      requestee: requestedUser,
      requester: currUser
    }

    return context;
  };
};
