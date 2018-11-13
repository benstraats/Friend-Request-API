// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    const row = context.params.query.row
    const key = context.params.query.key
    const value = context.params.query.value

    //TODO figure out how to get this working correctly

    return context;
  };
};
