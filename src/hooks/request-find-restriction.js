// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    const currUser = context.params.user

    let orQuery = context.params.query.$or

    orQuery.push({requestee: currUser})
    orQuery.push({requester: currUser})

    context.params.query.$or = orQuery

    return context;
  };
};
