const assert = require('assert');
const feathers = require('@feathersjs/feathers');
const profilePatchValidation = require('../../src/hooks/profile-patch-validation');

describe('\'ProfilePatchValidation\' hook', () => {
  let app;

  beforeEach(() => {
    app = feathers();

    app.use('/dummy', {
      async get(id) {
        return { id };
      }
    });

    app.service('dummy').hooks({
      before: profilePatchValidation()
    });
  });

  it('runs the hook', async () => {
    const result = await app.service('dummy').get('test');
    
    assert.deepEqual(result, { id: 'test' });
  });
});
