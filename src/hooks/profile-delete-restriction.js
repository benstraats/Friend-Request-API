// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    const currUser = "" + context.params.user._id

    if (context.id === undefined || context.id === null) {
      throw new Error('Can\'t delete mass user profiles');
    }

    await context.service.get(context.id).then((data) => {
      if (data.userID !== currUser) {
        throw new Error('Not allowed to delete this profile')
      }
    })

    return context;
  };
};
