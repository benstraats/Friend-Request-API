const { authenticate } = require('@feathersjs/authentication').hooks;

const {
  hashPassword, protect
} = require('@feathersjs/authentication-local').hooks;

const notAllowed = require('../../hooks/not-allowed');

const createUserDataIntegrity = require('../../hooks/create-user-data-integrity');

module.exports = {
  before: {
    all: [],
    find: [ authenticate('jwt') ],
    get: [ authenticate('jwt') ],
    create: [hashPassword(), createUserDataIntegrity()],
    update: [
      hashPassword(),
      authenticate('jwt'),
      notAllowed(),
      createUserDataIntegrity()
    ],
    patch: [hashPassword(), authenticate('jwt'), notAllowed()],
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
