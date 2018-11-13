// Initializes the `myrequests` service on path `/myrequests`
const createService = require('./myrequests.class.js');
const hooks = require('./myrequests.hooks');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    name: 'myrequests',
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/myrequests', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('myrequests');

  service.hooks(hooks);
};
