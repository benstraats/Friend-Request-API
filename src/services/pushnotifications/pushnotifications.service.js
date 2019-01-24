// Initializes the `pushnotifications` service on path `/pushnotifications`
const createService = require('feathers-mongodb');
const hooks = require('./pushnotifications.hooks');

module.exports = function (app) {
  const paginate = app.get('paginate');
  const mongoClient = app.get('mongoClient');
  const options = { paginate };

  // Initialize our service with any options it requires
  app.use('/pushnotifications', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('pushnotifications');

  mongoClient.then(db => {
    service.Model = db.collection('pushnotifications');
  });

  service.hooks(hooks);
};
