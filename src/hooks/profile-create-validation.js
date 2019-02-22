// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const { FeathersError } = require('@feathersjs/errors');

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    const currUser = '' + context.params.user._id;

    await context.service.find({
      query: {
        userID: currUser
      }
    }).then((data) => {
      if (data.data.length) {
        throw new FeathersError('Already saved', 'Already-Created', 400);
      }
    });

    return context;
  };
};
