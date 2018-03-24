const { authenticate } = require('@feathersjs/authentication').hooks;

const notAllowed = require('../../hooks/not-allowed');
const createdAt = require('../../hooks/created-at');
const updatedAt = require('../../hooks/updated-at');
const createRequestValidation = require('../../hooks/create-request-validation');
const restrictRequests = require('../../hooks/restrict-requests');

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [createdAt()],
    update: [notAllowed(), updatedAt()],
    patch: [notAllowed(), updatedAt()],
    remove: []
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
