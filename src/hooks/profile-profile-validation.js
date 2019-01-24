// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const { FeathersError } = require('@feathersjs/errors');

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    const currUser = "" + context.params.user._id

    /*
    Must be in this format:
    userID: someObjectID,
    profile: [
      {row:0, key:socialMediaPlatform, value:userHandle},
      {row:1, key:socialMediaPlatform, value:userHandle},
      {row:2, key:socialMediaPlatform, value:userHandle},
      {row:3, key:socialMediaPlatform, value:userHandle},
      {row:4, key:socialMediaPlatform, value:userHandle},
      ...
    ]
    */
    let curatedProfile = context.data.profile

    if (context.data.profile.length > 50) {
      throw new FeathersError('Profile has more than 50 rows', 'Bad-Request', 400);
    }

    for (let i=0; i<context.data.profile.length; i++) {
      if (context.data.profile[i].row !== i) {
        throw new FeathersError('Rows are out of order', 'Bad-Request', 400);
      }
      if (!context.data.profile[i].key) {
        throw new FeathersError('Row must have a key', 'Bad-Request', 400);
      }
      if (!context.data.profile[i].value) {
        throw new FeathersError('Row must have a value', 'Bad-Request', 400);
      }
      let rowSave = context.data.profile[i].row
      let keySave = context.data.profile[i].key
      let valueSave = context.data.profile[i].value

      if (keySave.length > 200) {
        throw new FeathersError('Rows key is longer than 200 characters', 'Bad-Request', 400);
      }

      if (valueSave.length > 200) {
        throw new FeathersError('Rows value is longer than 200 characters', 'Bad-Request', 400);
      }

      curatedProfile[i] = {row:rowSave, key:keySave, value:valueSave}
    }
   
    context.data = {
      userID: currUser,
      profile: curatedProfile
    }

    return context;
  };
};
