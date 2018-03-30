const { authenticate } = require('@feathersjs/authentication').hooks;

const notAllowed = require('../../hooks/not-allowed');
const createdAt = require('../../hooks/created-at');
const updatedAt = require('../../hooks/updated-at');
const profileFindRestriction = require('../../hooks/profile-find-restriction');
const profileGetRestriction = require('../../hooks/profile-get-restriction');
const profileDeleteRestriction = require('../../hooks/profile-delete-restriction');
const profileCreateValidation = require('../../hooks/profile-create-validation');
const profileUpdateValidation = require('../../hooks/profile-update-validation');
const profileProfileValidation = require('../../hooks/profile-profile-validation');
const profilePatchValidation = require('../../hooks/profile-patch-validation');

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [profileFindRestriction()],
    get: [],
    create: [ profileCreateValidation(), profileProfileValidation(), createdAt()],
    update: [profileUpdateValidation(), profileProfileValidation(), updatedAt()],
    patch: [profileUpdateValidation(), profilePatchValidation(), updatedAt()],
    remove: [profileDeleteRestriction()]
  },

  after: {
    all: [],
    find: [],
    get: [profileGetRestriction()],
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
