// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {

    //check it contains email, name, and password
    if(!context.data.email) {
      throw new Error('A user must have an email');
    } else if(!context.data.name) {
      throw new Error('A user must have a name.');
    } else if(!context.data.password) {
      throw new Error("A user much have a password");
    }

    context.data.email = context.data.email.trim();
    context.data.name = context.data.name.trim();
    context.data.password = context.data.password.trim();

    //check all are valid strings with length and no numbers in name, etc
    if (context.data.email.length < 3) {
      throw new Error('Email must have atleast 3 characters');
    } else if(context.data.name.length < 3) {
      throw new Error('Name must have atleast 3 cahracters');
    } else if(!(/^[a-zA-Z ]+$/.test(context.data.name))) {
      throw new Error('Name has invalid characters')
    } else if(context.data.password.length < 6) {
      throw new Error('Password must have atleast 6 characters');
    }

    return context;
  };
};
