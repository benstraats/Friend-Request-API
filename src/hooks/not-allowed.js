// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const { FeathersError } = require('@feathersjs/errors');

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async () => {
    throw new FeathersError('Not allowed', 'Not-Allowed', 403);
  };
};
