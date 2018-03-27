// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    const currUser = context.params.user.email
    const requestID = context.data.requestID

    if(!context.data.targetUser) {
      throw new Error("A friedship must have a targetUser");
    }

    const targetUser = context.data.targetUser.trim();

    if (currUser === targetUser) {
      throw new Error("Can\'t be friends with themself.")
    }

    //Check target is valid
    await context.app.service('users').find({
      query: {
        email: targetUser
      }
    }).then((data) => {
      if (!data.data.length) {
        throw new Error('Target user doesn\'t exist');
      }
    });

    //check not friends
    await context.service.find({
      query: {
        user1: targetUser,
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
        user2: targetUser
      }
    }).then((data) => {
      if (data.data.length) {
        throw new Error('Users are already friends.');
      }
    })

    //Check the request exists
    await context.app.service('requests').find({
      query: {
          requestee: currUser,
          requester: targetUser
      }
    }).then((data) => {
      if (!data.data.length) {
        throw new Error('Users don\'t have a request between them');
      }
    });

    //delete the request
    await context.app.service('requests').remove(requestID);

    context.data = {
      user1: targetUser,
      user2: currUser
    }

    return context;
  };
};
