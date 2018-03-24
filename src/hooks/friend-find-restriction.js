// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {

    //Calls done from the outside
    if (context.params.user !== undefined && context.params.user !== null) {
      const currUser = context.params.user.email
      
      context.params.query.$or= [{
        user1: currUser
      }, {
        user2: currUser
      }]
    }

    return context;
  };
};