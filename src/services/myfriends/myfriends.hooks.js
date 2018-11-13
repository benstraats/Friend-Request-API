const { authenticate } = require('@feathersjs/authentication').hooks;
const notAllowed = require('../../hooks/not-allowed');

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [notAllowed()],//will be used when i allow searching these
    create: [notAllowed()],
    update: [notAllowed()],
    patch: [notAllowed()],
    remove: [notAllowed()]
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
