// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {

    const search = context.params.query.$search
    
    delete context.params.query.$search

    if (search !== undefined) {
      context.params.query.$or = [
          {name: {$regex: search}},
          {email: {$regex: search}}
        ]

      context.params.query.$sort = {
        name: 1,
        email: 1
      }

      context.params.query.$select = ['name', 'email']
    }

    return context;
  };
};
