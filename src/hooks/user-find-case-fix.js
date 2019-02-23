// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
  
    if (context.params.query.username !== undefined) {
      context.params.query.username = {$regex: context.params.query.username, '$options' : 'i'};
    }

    if (context.params.query.email !== undefined) {
      context.params.query.email = {$regex: context.params.query.email, '$options' : 'i'};
    }

    return context;
  };
};