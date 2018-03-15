// Initializes the `requests` service on path `/requests`
const createService = require('feathers-mongodb');
const hooks = require('./requests.hooks');

module.exports = function (app) {
  const paginate = app.get('paginate');
  const mongoClient = app.get('mongoClient');
  const options = { paginate };

  // Initialize our service with any options it requires
  app.use('/requests', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('requests');

  mongoClient.then(db => {
    service.Model = db.collection('requests');
  });

  service.hooks(hooks);
};
