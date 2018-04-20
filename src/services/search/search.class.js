/* eslint-disable no-unused-vars */
class Service {
  constructor (options) {
    this.options = options || {};
  }

  setup(app) {
    this.app = app;
  }

  async find (params) {
    return await this.app.service('search').get('', params);
  }

  async get (id, params) {

    let currUser = '' + params.user._id
    let app = this.app
    let limit = params.query.$limit;
    let skip = params.query.$skip;

    return await app.service('users').find({
      query: {
        $or: [
          {name:{$regex: id, '$options' : 'i'}},
          {email:{$regex: id, '$options' : 'i'}}
        ],
        $sort: {
          name: 1,
          email: 1
        },
        $select: ['name', 'email'],
        $limit: limit,
        $skip: skip
      }
    }).then((data) => {

      let searchData = [];

      let ids = [];
      for (let i=0; i<data.data.length; i++) {
        ids.push('' + data.data[i]._id);
      }

      searchData.push({'Users': data});

      return app.service('friends').find({
        query: {
          $or :[
            {
              user1: currUser,
              user2: {$in: ids}
            },
            {
              user1: {$in: ids},
              user2: currUser
            }
          ],
          $limit: limit
        }
      }).then((friendData) => {
        searchData.push({'Friends': friendData})

        //TODO: move this outside so it runs so it runs async with friends
        return app.service('requests').find({
          query: {
            $or: [
              {
                requester: currUser,
                requestee: {$in: ids}
              },
              {
                requester: {$in: ids},
                requestee: currUser
              }
            ],
            $limit: limit
          }
        }).then((requestData) => {
          searchData.push({'Requests': requestData})
  
          return { searchData }
        })
      })
    })
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
