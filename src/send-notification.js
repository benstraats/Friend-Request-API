var request = require('request');
var config = require('../config/default.json');
var apn = require('apn');

module.exports = function (token, title, message, os) {
    
  if (os === 'ios') {
    let options = {
      token: {
        key: config.iosKey,
        keyId: config.iosKeyID,
        teamId: config.iosTeamID
      },
      production: false
    };

    var apnProvider = new apn.Provider(options);

    var note = new apn.Notification();

    note.expiry = Math.floor(Date.now() / 1000) + 3600; // Expires 1 hour from now.
    note.badge = 0;
    note.sound = 'ping.aiff';
    note.alert = message;
    note.payload = { 'messageFrom': 'Friend Request' };
    note.topic = config.iosNoteTopic;

    apnProvider.send(note, token);

  }
  else if (os === 'android') {
    let options = {
      method: 'POST',
      url: 'https://fcm.googleapis.com/fcm/send',
      headers: {
        'Content-Type': 'application/json',
        Authorization: config.pushNotificationAuthorization
      },
      body: '{"to" : "' + token + '","data": {"message": "' + message + '", "title":"' + title + '"}}'
    };

    request(options, function (error, response, body) {
      if (error) throw new Error(error);
    });
  }
};
