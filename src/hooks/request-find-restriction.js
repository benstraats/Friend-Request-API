// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    const currUser = context.params.user
    
    context.params.query.$or= [{
      requestee: currUser
    }, {
      requester: currUser
    }]

    return context;
  };
};
