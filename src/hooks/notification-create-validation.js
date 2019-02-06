// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const { FeathersError } = require('@feathersjs/errors');

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
    return async context => {
  
        const currUser = "" + context.params.user._id
        const newToken = "" + context.data.token
        const deviceOS = "" + context.data.os
        const constContext = context;

        if (newToken === undefined || newToken === "") {
          throw new FeathersError('No token in payload', 'Bad-Payload', 400);
        }

        if (deviceOS === undefined && !(deviceOS === 'ios' || deviceOS === 'android')) {
          throw new FeathersError('os field in payload must be ios or android', 'Bad-Payload', 400);
        }

        let alreadySaved = false;

        //delete it if its on another user
        await context.service.find({
          query: {
            token: newToken,
          }
        }).then((data) => {
          for (let i=0; i<data.data.length; i++) {
            if (data.data[i].userID === currUser) {
              alreadySaved = true;
            }
            //token is saved on another user, delete it
            else {
              constContext.service.remove(data.data[i]._id)
            }
          }
        })

        if (alreadySaved) {
          throw new FeathersError('Token already saved', 'Already-Saved', 208);
        }

        context.data = {
          token: newToken,
          userID: currUser,
          os: deviceOS
        }
    
        return context;
    };
  };