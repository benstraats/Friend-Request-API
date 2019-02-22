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
        //Make sure params are safe here and we dont delete a good request
        context.params.query.$or= [{
          requestee: currUser
        }, {
          requester: currUser
        }];
      }
      else{
        //Will error if we dont have access
        await context.service.get(id).then((data) => {
          if (currUser !== data.requestee && currUser !== data.requester) {
            throw new FeathersError('Not allowed to delete request', 'Not-Allowed', 403);
          }
        });
      }
    }

    return context;
  };
};
