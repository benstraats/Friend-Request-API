// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {

    if (context.params.user !== undefined && context.params.user !== null) {
      const currUser = "" + context.params.user._id

      const userID = context.params.query.userID
      
      if (userID !== undefined && userID !== null) {
        //TODO: handle the case where the client asks for a specific set of users profiles
        if (userID !== currID) {
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
              throw new Error('Users are not friends.');
            }
          })
        }
      }

      else {
        const limit = context.params.query.$limit || 50
        const skip = context.params.query.$skip || 0

        //get all profiles of the friends of the user
        await context.app.service('friends').find({
          query: {
            $or: [{
              user1: currUser
            }, {
              user2: currUser
            }],
            $limit: limit,
            $skip = skip
          }
        }).then((data) => {
          //go over all returned users
          const length = data.data.length
          let users = []
          let userIter = 0

          for (let i=0; i<length; i++) {
            if (data.data[i].user1 !== currUser && !users.includes(data.data[i].user1)) {
              users[userIter] = objectid(users[userIter].user1)
              userIter++
            }
            else if (data.data[i].user2 !== currUser && !users.includes(data.data[i].user2)) {
              users[userIter] = objectid(users[userIter].user)
              userIter++
            }
          }

          context.params.query.userID = {
            $in: users
          }
        })
      }
    }

    return context;
  };
};
