//if we got this far the request will save
const sendNotification = require('../send-notification');

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
    return async context => {

      const currUser = "" + context.params.user._id
      let otherUser = "" + context.data.requestee;

      //Get the current users name and username
      let currUserInfo = await context.app.service('users').get(currUser)

      //now alert the other user
      let otherUserTokens = await context.app.service('pushnotifications').find({
        query: {
            userID: otherUser
        }
      })

      for (let i=0; i<otherUserTokens.data.length; i++) {
          sendNotification(otherUserTokens.data[i].token, 'New Request', '' + currUserInfo.name + ' (' + currUserInfo.email + ') sent you a friend request!')
      }

      return context;
    };
  };
  