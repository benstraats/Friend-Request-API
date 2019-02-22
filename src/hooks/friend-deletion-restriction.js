// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const { FeathersError } = require('@feathersjs/errors');

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {

    if (context.params.user !== undefined && context.params.user !== null) {
      const id = context.id;
      const currUser = '' + context.params.user._id;

      if (id === null) {
        //make sure params are safe here and we dont delete a good request
        context.params.query.$or= [{
          user1: currUser
        }, {
          user2: currUser
        }];
      } else {
        await context.service.get(id).then((data) => {
          if (currUser !== data.user1 && currUser !== data.user2) {
            throw new FeathersError('Not allowed to delete friendship', 'Not-Allowed', 403);
          }
        });
      }
    }

    return context;
  };
};
