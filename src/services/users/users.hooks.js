const { authenticate } = require('@feathersjs/authentication').hooks;

const {
  hashPassword, protect
} = require('@feathersjs/authentication-local').hooks;

const notAllowed = require('../../hooks/not-allowed');
const createUserDataIntegrity = require('../../hooks/create-user-data-integrity');
const ensureUserDoesntExist = require('../../hooks/ensure-user-doesnt-exist');
const userSearch = require('../../hooks/user-search');
const createdAt = require('../../hooks/created-at');
const updatedAt = require('../../hooks/updated-at');

module.exports = {
  before: {
    all: [],
    find: [ authenticate('jwt'), userSearch() ],
    get: [ authenticate('jwt') ],
    create: [ensureUserDoesntExist(),hashPassword(), createdAt()],
    update: [
      hashPassword(),
      authenticate('jwt'),
      notAllowed(),
      updatedAt()
    ],
    patch: [hashPassword(), authenticate('jwt'), notAllowed(), updatedAt()],
    remove: [authenticate('jwt'), notAllowed()]
  },

  after: {
    all: [ 
      // Make sure the password field is never sent to the client
      // Always must be the last hook
      protect('password')
    ],
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
