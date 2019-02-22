// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const { FeathersError } = require('@feathersjs/errors');

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {

    if (context.params.user !== undefined && context.params.user !== null) {
            
      const currUser = '' + context.params.user._id;
      const givenToken = '' + context.id;

      await context.service.find({
        query: {
          token: givenToken,
          userID: currUser
        }
      }).then((data) => {
        if (data.data.length) {
          context.id = data.data[0]._id;
        }
        else {
          throw new FeathersError('Token isn\'t saved', 'Not-Saved', 208);
        }
      });

    }

    return context;
  };
};
  