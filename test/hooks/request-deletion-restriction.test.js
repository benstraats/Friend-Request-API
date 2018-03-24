const assert = require('assert');
const feathers = require('@feathersjs/feathers');
const requestDeletionRestriction = require('../../src/hooks/request-deletion-restriction');

describe('\'RequestDeletionRestriction\' hook', () => {
  let app;

  beforeEach(() => {
    app = feathers();

    app.use('/dummy', {
      async get(id) {
        return { id };
      }
    });

    app.service('dummy').hooks({
      before: requestDeletionRestriction()
    });
  });

  it('runs the hook', async () => {
    const result = await app.service('dummy').get('test');
    
    assert.deepEqual(result, { id: 'test' });
  });
});
