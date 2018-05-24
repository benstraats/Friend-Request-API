// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {

    let email = context.data.email;
    let name = context.data.name;
    let password = context.data.password;

    //check it contains email, name, and password
    if(!context.data.email) {
      throw new Error('A user must have an email/username');
    } else if(!context.data.name) {
      throw new Error('A user must have a name');
    } else if(!context.data.password) {
      throw new Error("A user much have a password");
    }

    email = email.trim();
    name = name.trim();
    password = password.trim();

    //check all are valid strings with length and no numbers in name, etc
    if (email.length < 3) {
      throw new Error('Email must have atleast 3 characters');
    } else if(email.length > 50) {
      throw new Error('Email must be less than 50 characters')
    } else if(name.length < 3) {
      throw new Error('Name must have atleast 3 cahracters');
    } else if(name.length > 100) {
      throw new Error('Name must be less than 100 characters')
    } else if(password.length < 6) {
      throw new Error('Password must have atleast 6 characters');
    } else if(password.length > 50) {
      throw new Error('Password must be less than 50 characters')
    }

    var nameRegex = RegExp("/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u")
    var usernameRegex = RegExp('/^([a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð_-])*$/')

    if (!(nameRegex.test(name))) {
      throw new Error('Name contains invalid characters')
    }

    if (!(usernameRegex.test(email))) {
      throw new Error('Email contains invalid characters')
    }

    //make sure no extra data is inserted
    context.data = {
      name: name,
      email: email,
      password: password
    }

    return context;
  };
};
