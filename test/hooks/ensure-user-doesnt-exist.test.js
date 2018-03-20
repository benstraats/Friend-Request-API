const assert = require('assert');
const feathers = require('@feathersjs/feathers');
const ensureUserDoesntExist = require('../../src/hooks/ensure-user-doesnt-exist');

describe('\'EnsureUserDoesntExist\' hook', () => {
  let app;

  beforeEach(() => {
    app = feathers();

    app.use('/dummy', {
      async get(id) {
        return { id };
      }
    });

    app.service('dummy').hooks({
      before: ensureUserDoesntExist()
    });
  });

  it('runs the hook', async () => {
    const result = await app.service('dummy').get('test');
    
    assert.deepEqual(result, { id: 'test' });
  });
});
