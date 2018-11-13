// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    const currUser = "" + context.params.user._id

    //Check request has a requestee
    if(!context.data.requesteeID) {
      throw new Error("A request must have a requestee");
    }

    const requestedUser = context.data.requesteeID.trim();

    //Check not requesting themselves
    if (currUser === requestedUser) {
      throw new Error("Can\'t request themself.")
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
        throw new Error('Users are already friends.');
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
        throw new Error('There is already a request between users');
      }
    })

    context.data = {
      requestee: requestedUser,
      requester: currUser
    }

    return context;
  };
};
