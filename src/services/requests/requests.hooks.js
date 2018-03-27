const { authenticate } = require('@feathersjs/authentication').hooks;

const notAllowed = require('../../hooks/not-allowed');
const createdAt = require('../../hooks/created-at');
const updatedAt = require('../../hooks/updated-at');
const requestGetRestriction = require('../../hooks/request-get-restriction');
const requestCreationValidation = require('../../hooks/request-creation-validation');
const requestDeletionRestriction = require('../../hooks/request-deletion-restriction');
const requestFindRestriction = require('../../hooks/request-find-restriction');
const attachUserInfo = require('../../hooks/attach-user-info');
const setLimitMax = require('../../hooks/set-limit-max');

module.exports = {
  before: {
    all: [authenticate('jwt'), setLimitMax()],
    find: [requestFindRestriction()],
    get: [],
    create: [requestCreationValidation(), createdAt()],
    update: [notAllowed(), updatedAt()],
    patch: [notAllowed(), updatedAt()],
    remove: [requestDeletionRestriction()]
  },

  after: {
    all: [],
    find: [attachUserInfo()],
    get: [requestGetRestriction(), attachUserInfo()],
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
