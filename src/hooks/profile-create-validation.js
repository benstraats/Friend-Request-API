// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    const currUser = "" + context.params.user._id

    await context.service.find({
      query: {
        userID: currUser
      }
    }).then((data) => {
      if (data.data.length) {
        throw new Error('Profile for user has already been created')
      }
    })

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
      if (profile[i].row !== i) {
        throw new Error('Rows are out of order');
      }
      if (!profile[i].key) {
        throw new Error('Row must have a key');
      }
      if (!profile[i].value) {
        throw new Error('Row must have a value');
      }
      let rowSave = profile[i].row
      let keySave = profile[i].key
      let valueSave = profile[i].value
      curatedProfile[i] = {row:rowSave, key:keySave, value:valueSave}
    }
    
    context.data = {
      userID: currUser,
      profile: curateProfile
    }

    return context;
  };
};
