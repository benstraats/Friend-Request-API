// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    const id = context.id

    if (id === null) {
      //make sure params are safe here and we dont delete a good request
    } else {
      await context.service.get(id)
    }

    return context;
  };
};
