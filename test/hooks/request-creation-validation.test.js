const assert = require('assert');
const feathers = require('@feathersjs/feathers');
const requestCreationValidation = require('../../src/hooks/request-creation-validation');

describe('\'RequestCreationValidation\' hook', () => {
  let app;

  beforeEach(() => {
    app = feathers();

    app.use('/dummy', {
      async get(id) {
        return { id };
      }
    });

    app.service('dummy').hooks({
      before: requestCreationValidation()
    });
  });

  it('runs the hook', async () => {
    const result = await app.service('dummy').get('test');
    
    assert.deepEqual(result, { id: 'test' });
  });
});
