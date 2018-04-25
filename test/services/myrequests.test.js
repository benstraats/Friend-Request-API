const assert = require('assert');
const app = require('../../src/app');

describe('\'myrequests\' service', () => {
  it('registered the service', () => {
    const service = app.service('myrequests');

    assert.ok(service, 'Registered the service');
  });
});
