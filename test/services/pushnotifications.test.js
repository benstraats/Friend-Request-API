const assert = require('assert');
const app = require('../../src/app');

describe('\'pushnotifications\' service', () => {
  it('registered the service', () => {
    const service = app.service('pushnotifications');

    assert.ok(service, 'Registered the service');
  });
});
