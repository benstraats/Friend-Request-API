const assert = require('assert');
const app = require('../../src/app');

describe('\'requests\' service', () => {
  it('registered the service', () => {
    const service = app.service('requests');

    assert.ok(service, 'Registered the service');
  });
});
