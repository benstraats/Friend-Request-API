const assert = require('assert');
const feathers = require('@feathersjs/feathers');
const friendDeletionRestriction = require('../../src/hooks/friend-deletion-restriction');

describe('\'FriendDeletionRestriction\' hook', () => {
  let app;

  beforeEach(() => {
    app = feathers();

    app.use('/dummy', {
      async get(id) {
        return { id };
      }
    });

    app.service('dummy').hooks({
      before: friendDeletionRestriction()
    });
  });

  it('runs the hook', async () => {
    const result = await app.service('dummy').get('test');
    
    assert.deepEqual(result, { id: 'test' });
  });
});
