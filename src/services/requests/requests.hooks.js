const { authenticate } = require('@feathersjs/authentication').hooks;

const notAllowed = require('../../hooks/not-allowed');
const createdAt = require('../../hooks/created-at');
const updatedAt = require('../../hooks/updated-at');
const requestGetRestriction = require('../../hooks/request-get-restriction');
const requestCreationValidation = require('../../hooks/request-creation-validation');
const requestDeletionRestriction = require('../../hooks/request-deletion-restriction');
const requestFindRestriction = require('../../hooks/request-find-restriction');
const requestNotification = require('../../hooks/request-notification');

module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [requestFindRestriction()],
    get: [],
    create: [requestCreationValidation(), createdAt(), requestNotification()],
    update: [notAllowed(), updatedAt()],
    patch: [notAllowed(), updatedAt()],
    remove: [requestDeletionRestriction()]
  },

  after: {
    all: [],
    find: [],
    get: [requestGetRestriction()],
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
