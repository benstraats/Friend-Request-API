// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const { FeathersError } = require('@feathersjs/errors');

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    const userEmail = context.data.email;

    await context.service.find({
      query: {
        email: userEmail
      }
    }).then((data) => {
      if (data.data.length) {
        throw new FeathersError('This username is already in use by somebody else.', 'Not-Allowed', 403);
      }
    });

    return context;
  };
};
