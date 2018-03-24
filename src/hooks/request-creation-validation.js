// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    const currUser = context.params.user

    if(!context.data.requestee) {
      throw new Error("A request must have a requestee");
    }

    const requestedUser = context.data.requestee.trim();

    if (currUser === requestedUser) {
      throw new Error("Can\'t request themself.")
    }

    //Check target is valid
    await context.app.service('users').find({
      query: {
        email: requestedUser
      }
    }).then((data) => {
      if (!data.data.length) {
        throw new Error('Requested user doesn\'t exist');
      }
    });

    //check not friends
    await context.app.service('friends').find({
      query: {
        $or: [
          {
            user1: requestedUser,
            user2: currUser
        }, {
          user1: currUser,
          user2: requestedUser
        }]
      }
    }).then((data) => {
      if (data.data.length) {
        throw new Error('Users are already friends.');
      }
    });

    //check request doesnt already exist (either way relationship)
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
        throw new Error('Users already have a request between them');
      }
    });

    context.data = {
      requestee: requestedUser,
      requester: currUser
    }

    return context;
  };
};
