// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    const currUser = context.params.user.email

    await context.service.get(context.id).then((data) => {
      if (data.email !== currUser) {
        throw new Error('You don\'t have access to delete this user')
      }
    })

    return context;
  };
};
