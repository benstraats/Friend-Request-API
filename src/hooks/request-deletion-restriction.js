// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {

    const id = context.id

    if (id === null) {
      throw new Error('Bulk delete isn\'t supported')
    }
    else{
      //Will error if we dont have access
      await context.service.get(id)
    }

    //Ensure we delete the whole request
    context.params.query = {}

    return context;
  };
};
