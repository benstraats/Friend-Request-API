/* eslint-disable no-console */
const logger = require('winston');
const app = require('./app');
const port = app.get('port');

var http = require('http');
http.createServer(function (req, res) {
    res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
    res.end();
}).listen(80);

// HTTPS SUPPORT
const https = require('https');
const fs = require('fs');

let authData = {
// use your own keys
  key: fs.readFileSync('/path/to/private.key'),
  cert: fs.readFileSync('/path/to/certificate.crt'),
  ca: [
        fs.readFileSync('/path/to/intermediateCertOne.crt'),
        fs.readFileSync('/path/to/intermediateCertTwo.crt') 
      ]
};

let serverHttps = https.createServer(authData, app);

app.setup(serverHttps)

serverHttps.listen(app.get('port'), function () {
  console.log('Express https server listening on port ', port);
});

serverHttps.on('listening', () =>
  logger.info('Feathers application started on https://' + app.get('host') + ':' + port)
);
