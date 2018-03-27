// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    const currUser = context.params.user.email

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
        user1: requestedUser,
        user2: currUser
      }
    }).then((data) => {
      if (data.data.length) {
        throw new Error('Users are already friends.');
      }
    });

    await context.service.find({
      query: {
        user1: currUser,
        user2: requestedUser
      }
    }).then((data) => {
      if (data.data.length) {
        throw new Error('Users are already friends.');
      }
    })

    await context.service.find({
      query: {
        requestee: requestedUser,
        requester: currUser
      }
    }).then((data) => {
      if (data.data.length) {
        throw new Error('Current User has already sent a request');
      }
    });

    await context.service.find({
      query: {
        requestee: currUser,
        requester: requestedUser
      }
    }).then((data) => {
      if (data.data.length) {
        //Could just accept friend here and now
        throw new Error('Current user has already been requested by requestee');
      }
    })

    context.data = {
      requestee: requestedUser,
      requester: currUser
    }

    return context;
  };
};
