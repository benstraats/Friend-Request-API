// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

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
        throw new Error('This username is already in use by somebody else.');
      }
    });

    return context;
  };
};
