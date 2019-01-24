const { authenticate } = require('@feathersjs/authentication').hooks;
const notAllowed = require('../../hooks/not-allowed');
const internalOnly = require('../../hooks/internal-only');
const notificationsCreateValidation = require('../../hooks/notification-create-validation');
const notificationsDeleteValidation = require('../../hooks/notification-delete-validation');

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [internalOnly()],
    get: [notAllowed()],
    create: [notificationsCreateValidation()],
    update: [notAllowed()],
    patch: [notAllowed()],
    remove: [notificationsDeleteValidation()]
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
