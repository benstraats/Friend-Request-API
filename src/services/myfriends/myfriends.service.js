// Initializes the `myfriends` service on path `/myfriends`
const createService = require('./myfriends.class.js');
const hooks = require('./myfriends.hooks');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    name: 'myfriends',
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/myfriends', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('myfriends');

  service.hooks(hooks);
};
