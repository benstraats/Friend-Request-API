var request = require("request");
var config = require("../config/default.json")

module.exports = function (token, title, message) {

    var options = { method: 'POST',
        url: 'https://fcm.googleapis.com/fcm/send',
        headers: {
            'Content-Type': 'application/json',
            Authorization: config.pushNotificationAuthorization 
        },
        body: '{"to" : "' + token + '","data": {"message": "' + message + '", "title":"' + title + '"}}' 
    };

    request(options, function (error, response, body) {
    if (error) throw new Error(error);

    //console.log(body);
    });
};
  