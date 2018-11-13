// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

var objectid = require('objectid')

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {

    const newResult = context.result

    let users = []

    //Get methods
    if (context.result.data === undefined || context.result.data === null) {

      //A single request
      if (context.result.requester) {
        users[0] = objectid(context.result.requester)
        users[1] = objectid(context.result.requestee)
      }

      //A single friendship
      else {
        users[0] = objectid(context.result.user1)
        users[1] = objectid(context.result.user2)
      }
    }

    //Find methods
    else {
      let i = 0
      let otherIter = 0
      const hold = context.result.data
      for (otherIter = 0; otherIter < context.result.data.length; otherIter++) {
        if (hold[otherIter].requestee !== undefined && hold[otherIter].requestee !== null && !users.includes(hold[otherIter].requestee)) {
          users[i] = objectid(hold[otherIter].requestee)
          i++
        }
        if (hold[otherIter].requester !== undefined && hold[otherIter].requester !== null && !users.includes(hold[otherIter].requester)) {
          users[i] = objectid(hold[otherIter].requester)
          i++
        }
        if (hold[otherIter].user1 !== undefined && hold[otherIter].user1 !== null && !users.includes(hold[otherIter].user1)) {
          users[i] = objectid(hold[otherIter].user1)
          i++
        }
        if (hold[otherIter].user2 !== undefined && hold[otherIter].user2 !== null && !users.includes(hold[otherIter].user2)) {
          users[i] = objectid(hold[otherIter].user2)
          i++
        }
      }
    }

    //check not friends
    await context.app.service('users').find({
      query: {
        _id: {$in: users},
        $select: ['name', 'email'],
        $limit: 50
      }
    }).then((data) => {
      newResult.userInfo = {
        data: data
      }
    })

    context.result = newResult
    return context;
  };
};
