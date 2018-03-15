// Initializes the `friends` service on path `/friends`
const createService = require('feathers-mongodb');
const hooks = require('./friends.hooks');

module.exports = function (app) {
  const paginate = app.get('paginate');
  const mongoClient = app.get('mongoClient');
  const options = { paginate };

  // Initialize our service with any options it requires
  app.use('/friends', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('friends');

  mongoClient.then(db => {
    service.Model = db.collection('friends');
  });

  service.hooks(hooks);
};
