const users = require('./users/users.service.js');
const friends = require('./friends/friends.service.js');
const requests = require('./requests/requests.service.js');
const profile = require('./profile/profile.service.js');
const search = require('./search/search.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(friends);
  app.configure(requests);
  app.configure(profile);
  app.configure(search);
};
