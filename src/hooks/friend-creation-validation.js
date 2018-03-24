// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    const currUser = context.params.user

    if (!context.data.targetUser) {
      throw new Error("A friendship must have two users")
    }

    const targetUser = context.data.targetUser.trim()

    if (currUser === targetUser) {
      throw new Error("User can\'t be friends with themselves.")
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
        $or: [
          {
            user1: targetUser,
            user2: currUser
        }, {
          user1: currUser,
          user2: targetUser
        }]
      }
    }).then((data) => {
      if (data.data.length) {
        throw new Error('Users are already friends.');
      }
    });

    //check not friends
    await context.app.service('requests').find({
      query: {
        requestee: currUser,
        requester: targetUser
      }
    }).then((data) => {
      if (!data.data.length) {
        throw new Error('Target user hasn\'t requested to be friends');
      } else {
        //delete the request
        await context.app.service('requests').remove({
          query: {
            requestee: currUser,
            requester: targetUser
          }
        })
      }
    });

    context.params.query = {
      user1: currUser,
      user2: targetUser
    }

    return context;
  };
};
