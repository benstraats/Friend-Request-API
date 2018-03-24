const assert = require('assert');
const feathers = require('@feathersjs/feathers');
const friendGetRestriction = require('../../src/hooks/friend-get-restriction');

describe('\'FriendGetRestriction\' hook', () => {
  let app;

  beforeEach(() => {
    app = feathers();

    app.use('/dummy', {
      async get(id) {
        return { id };
      }
    });

    app.service('dummy').hooks({
      after: friendGetRestriction()
    });
  });

  it('runs the hook', async () => {
    const result = await app.service('dummy').get('test');
    
    assert.deepEqual(result, { id: 'test' });
  });
});
