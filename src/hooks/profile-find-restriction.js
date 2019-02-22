// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const { FeathersError } = require('@feathersjs/errors');

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {

    if (context.params.user !== undefined && context.params.user !== null) {
      const currUser = '' + context.params.user._id;

      const userID = context.params.query.userID;
      
      //else will just get all users current user is friends with
      if (userID !== undefined && userID !== null) {

        //else is nothing since we can just return current users profile
        if (userID !== currUser) {

          if (Object.prototype.toString(userID) === '[object array]') {

            //Not sure if this works
            await context.app.service('friends').find({
              query: {
                $or: [{
                  user1: {$in: userID},
                  user2: currUser
                }, {
                  user1: currUser,
                  user2: {$in: userID},
                }]
              }
            }).then((data) => {
              if (data.data.length !== userID.length) {
                throw new FeathersError('Current user isn\'t friends with all specified users', 'Not-Allowed', 403);
              }
            });

          }

          else {
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
                throw new FeathersError('Users are not friends.', 'Not-Allowed', 403);
              }
            });
          }

        }
      }

      else {
        const limit = context.params.query.$limit || 50;
        const skip = context.params.query.$skip || 0;

        //get all profiles of the friends of the user
        await context.app.service('friends').find({
          query: {
            $limit: limit,
            $skip: skip,
            $or: [{
              user1: currUser
            }, {
              user2: currUser
            }]
          }
        }).then((data) => {
          //go over all returned users
          const length = data.data.length;
          let users = [];
          let userIter = 0;

          for (let i=0; i<length; i++) {
            if (data.data[i].user1 !== currUser && !users.includes(data.data[i].user1)) {
              users[userIter] = data.data[userIter].user1;
              userIter++;
            }
            else if (data.data[i].user2 !== currUser && !users.includes(data.data[i].user2)) {
              users[userIter] = data.data[userIter].user2;
              userIter++;
            }
          }

          context.params.query.userID = {
            $in: users
          };
        });
      }
    }

    return context;
  };
};
