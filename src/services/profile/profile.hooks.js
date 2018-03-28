const { authenticate } = require('@feathersjs/authentication').hooks;

const notAllowed = require('../../hooks/not-allowed');
const createdAt = require('../../hooks/created-at');
const updatedAt = require('../../hooks/updated-at');
const profileFindRestriction = require('../../hooks/profile-find-restriction');

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [profileFindRestriction()],
    get: [],
    create: [createdAt()],
    update: [updatedAt()],
    patch: [updatedAt()],
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
