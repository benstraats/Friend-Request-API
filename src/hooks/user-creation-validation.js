// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const { FeathersError } = require('@feathersjs/errors');

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {

    let username = context.data.username;
    let name = context.data.name;
    let password = context.data.password;

    //check it contains username, name, and password
    if(!context.data.username) {
      throw new FeathersError('A user must have an username', 'Bad-Request', 400);
    } else if(!context.data.name) {
      throw new FeathersError('A user must have a name', 'Bad-Request', 400);
    } else if(!context.data.password) {
      throw new FeathersError('A user much have a password', 'Bad-Request', 400);
    }


    //check all are valid strings with length and no numbers in name, etc
    if (username.length < 3) {
      throw new FeathersError('Username must have atleast 3 characters', 'Bad-Request', 400);
    } else if(username.length > 50) {
      throw new FeathersError('Username must be less than 50 characters', 'Bad-Request', 400);
    } else if(name.length < 3) {
      throw new FeathersError('Name must have atleast 3 cahracters', 'Bad-Request', 400);
    } else if(name.length > 100) {
      throw new FeathersError('Name must be less than 100 characters', 'Bad-Request', 400);
    } else if(password.length < 6) {
      throw new FeathersError('Password must have atleast 6 characters', 'Bad-Request', 400);
    } else if(password.length > 50) {
      throw new FeathersError('Password must be less than 50 characters', 'Bad-Request', 400);
    }

    var nameRegex = RegExp(/^[A-Za-zàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/);
    var nameStartsWithWhiteSpaceRegex = RegExp('^ ');
    var nameEndsWithWhiteSpaceRegex = RegExp(' $');
    var nameContainsDoubleWithWhiteSpaceRegex = RegExp(' {2}');
    var usernameRegex = RegExp(/^[A-Za-z0-9àáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð_-]+$/);

    if (!(nameRegex.test(name))) {
      throw new FeathersError('Name contains invalid characters', 'Bad-Request', 400);
    }

    if (nameStartsWithWhiteSpaceRegex.test(name)) {
      throw new FeathersError('Name starts with a space', 'Bad-Request', 400);
    }

    if (nameEndsWithWhiteSpaceRegex.test(name)) {
      throw new FeathersError('Name ends with a space', 'Bad-Request', 400);
    }

    if (nameContainsDoubleWithWhiteSpaceRegex.test(name)) {
      throw new FeathersError('Name has a double space', 'Bad-Request', 400);
    }

    if (!(usernameRegex.test(username))) {
      throw new FeathersError('Username contains invalid characters', 'Bad-Request', 400);
    }
    

    //make sure no extra data is inserted
    context.data = {
      name: name,
      username: username,
      password: password
    };

    return context;
  };
};
