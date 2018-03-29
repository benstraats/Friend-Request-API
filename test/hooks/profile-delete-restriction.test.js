const assert = require('assert');
const feathers = require('@feathersjs/feathers');
const profileDeleteRestriction = require('../../src/hooks/profile-delete-restriction');

describe('\'ProfileDeleteRestriction\' hook', () => {
  let app;

  beforeEach(() => {
    app = feathers();

    app.use('/dummy', {
      async get(id) {
        return { id };
      }
    });

    app.service('dummy').hooks({
      before: profileDeleteRestriction()
    });
  });

  it('runs the hook', async () => {
    const result = await app.service('dummy').get('test');
    
    assert.deepEqual(result, { id: 'test' });
  });
});
