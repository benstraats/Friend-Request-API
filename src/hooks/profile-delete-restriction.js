// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const { FeathersError } = require('@feathersjs/errors');

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    const currUser = '' + context.params.user._id;

    if (context.id === undefined || context.id === null) {
      throw new FeathersError('Can\'t delete mass user profiles', 'Not-Allowed', 403);
    }

    await context.service.get(context.id).then((data) => {
      if (data.userID !== currUser) {
        throw new FeathersError('Not allowed to delete this profile', 'Not-Allowed', 403);
      }
    });

    return context;
  };
};
