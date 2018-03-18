const assert = require('assert');
const feathers = require('@feathersjs/feathers');
const createUserDataIntegrity = require('../../src/hooks/create-user-data-integrity');

describe('\'create-user-data-integrity\' hook', () => {
  let app;

  beforeEach(() => {
    app = feathers();

    app.use('/dummy', {
      async get(id) {
        return { id };
      }
    });

    app.service('dummy').hooks({
      before: createUserDataIntegrity()
    });
  });

  it('runs the hook', async () => {
    const result = await app.service('dummy').get('test');
    
    assert.deepEqual(result, { id: 'test' });
  });
});
