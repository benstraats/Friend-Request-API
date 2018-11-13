// Application hooks that run for every service
const logger = require('./hooks/logger');

const createdAt = require('./hooks/created-at');

const updatedAt = require('./hooks/updated-at');

module.exports = {
  before: {
    all: [ logger() ],
    find: [],
    get: [],
    create: [createdAt()],
    update: [updatedAt()],
    patch: [updatedAt()],
    remove: []
  },

  after: {
    all: [ logger() ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [ logger() ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
