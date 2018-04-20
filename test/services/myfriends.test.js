const assert = require('assert');
const app = require('../../src/app');

describe('\'myfriends\' service', () => {
  it('registered the service', () => {
    const service = app.service('myfriends');

    assert.ok(service, 'Registered the service');
  });
});
