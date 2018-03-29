// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

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
    for (let i=0; i<context.data.profile.length; i++) {
      if (context.data.profile[i].row !== i) {
        throw new Error('Rows are out of order');
      }
      if (!context.data.profile[i].key) {
        throw new Error('Row must have a key');
      }
      if (!context.data.profile[i].value) {
        throw new Error('Row must have a value');
      }
      let rowSave = context.data.profile[i].row
      let keySave = context.data.profile[i].key
      let valueSave = context.data.profile[i].value
      curatedProfile[i] = {row:rowSave, key:keySave, value:valueSave}
    }
   
    context.data = {
      userID: currUser,
      profile: curatedProfile
    }

    return context;
  };
};
