const { authenticate } = require('@feathersjs/authentication').hooks;

const notAllowed = require('../../hooks/not-allowed');
const createdAt = require('../../hooks/created-at');
const updatedAt = require('../../hooks/updated-at');
const createRequestValidation = require('../../hooks/create-request-validation');

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [createdAt(), createRequestValidation()],
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
