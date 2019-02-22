/* eslint-disable no-unused-vars */
var objectid = require('objectid');

class Service {
  constructor (options) {
    this.options = options || {};
  }

  setup(app) {
    this.app = app;
  }

  async find (params) {
    let currUser = '' + params.user._id;
    let app = this.app;
    let limit = params.query.$limit;
    let skip = params.query.$skip;

    let requestData = {};

    return await app.service('requests').find({
      query: {
        requestee: currUser,
        $limit: limit,
        $skip: skip
      }
    }).then((data) => {
      requestData.requests = data;

      let ids = [];
      for (let i=0; i<data.data.length; i++) {
        ids.push(objectid(data.data[i].requester));
      }

      return app.service('users').find({
        query: {
          _id: {$in: ids},
          $limit: limit,
          $select: ['username', 'name']
        }
      }).then((userData) => {
        requestData.users = userData;

        return requestData;
      });
    });
  }

  async get (id, params) {
    return {
      id, text: `A new message with ID: ${id}!`
    };
  }

  async create (data, params) {
    if (Array.isArray(data)) {
      return await Promise.all(data.map(current => this.create(current)));
    }

    return data;
  }

  async update (id, data, params) {
    return data;
  }

  async patch (id, data, params) {
    return data;
  }

  async remove (id, params) {
    return { id };
  }
}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
