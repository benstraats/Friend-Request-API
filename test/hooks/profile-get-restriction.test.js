const assert = require('assert');
const feathers = require('@feathersjs/feathers');
const profileGetRestriction = require('../../src/hooks/profile-get-restriction');

describe('\'ProfileGetRestriction\' hook', () => {
  let app;

  beforeEach(() => {
    app = feathers();

    app.use('/dummy', {
      async get(id) {
        return { id };
      }
    });

    app.service('dummy').hooks({
      before: profileGetRestriction()
    });
  });

  it('runs the hook', async () => {
    const result = await app.service('dummy').get('test');
    
    assert.deepEqual(result, { id: 'test' });
  });
});
