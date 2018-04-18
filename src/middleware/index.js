const { authenticate } = require('@feathersjs/authentication').hooks;

// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  // Add your custom middleware here. Remember, that
  // in Express the order matters

  const currUser = 'ben';

  const searchService = {
    get(token) {
      return Promise.resolve( 
        app.service('users').find({
          query: {
            $or: [
              {name: {$regex: token}},
              {email: {$regex: token}}
            ],
            $limit: 49
          }
        }).then((data) => {

          let ids = {};
          let $or = [];

          for (let i=0; i<49; i++) {
            data.data[i].password = "";

            $or.push({requester: data.data[i]._id});
          }

          return $or;
        })
      );
    },

    find() {
      return Promise.resolve( 
        app.service('search').get("")
      );
    }
  };
  
  app.use('/search', searchService);

  //https://github.com/feathersjs/docs/blob/master/api/express.md
  //custom service middleware section
};
