const { authenticate } = require('@feathersjs/authentication').hooks;

const notAllowed = require('../../hooks/not-allowed');
const createdAt = require('../../hooks/created-at');
const updatedAt = require('../../hooks/updated-at');
const friendCreationValidation = require('../../hooks/friend-creation-validation');
const friendGetRestriction = require('../../hooks/friend-get-restriction');
const friendDeletionRestriction = require('../../hooks/friend-deletion-restriction');
const friendFindRestriction = require('../../hooks/friend-find-restriction');
const attachUserInfo = require('../../hooks/attach-user-info');

const setLimitMax = require('../../hooks/set-limit-max');

module.exports = {
  before: {
    all: [authenticate('jwt'), setLimitMax()],
    find: [friendFindRestriction()],
    get: [],
    create: [friendCreationValidation(), createdAt()],
    update: [notAllowed(), updatedAt()],
    patch: [notAllowed(), updatedAt()],
    remove: [friendDeletionRestriction()]
  },

  after: {
    all: [],
    find: [attachUserInfo()],
    get: [friendGetRestriction(), attachUserInfo()],
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
