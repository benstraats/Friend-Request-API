// Initializes the `profile` service on path `/profile`
const createService = require('feathers-mongodb');
const hooks = require('./profile.hooks');

module.exports = function (app) {
  const paginate = app.get('paginate');
  const mongoClient = app.get('mongoClient');
  const options = { paginate };

  // Initialize our service with any options it requires
  app.use('/profile', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('profile');

  mongoClient.then(db => {
    service.Model = db.collection('profile');
  });

  service.hooks(hooks);
};
