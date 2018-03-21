// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {

    const search = context.params.query.search

    context.params.query = {
      $or: [
        {name: {$regex: search}},
        {email: {$regex: search}}
      ]
    }

    return context;
  };
};
