/* eslint-disable no-console */
const logger = require('winston');
const app = require('./app');
const port = app.get('port');

var http = require('http');
http.createServer(function (req, res) {
  res.writeHead(301, { 'Location': 'https://' + req.headers['host'] + req.url });
  res.end();
}).listen(80);

// HTTPS SUPPORT
const https = require('https');
const fs = require('fs');

let parentPath = './cert/';

let authData = {
// use your own keys
  key: fs.readFileSync(parentPath + 'private.key'),
  cert: fs.readFileSync(parentPath + 'certificate.crt'),
  ca: [
    fs.readFileSync(parentPath + 'intermediateCertOne.crt'),
    fs.readFileSync(parentPath + 'intermediateCertTwo.crt') 
  ]
};

let serverHttps = https.createServer(authData, app);

app.setup(serverHttps);

serverHttps.listen(app.get('port'), function () {
  console.log('Express https server listening on port ', port);
});

serverHttps.on('listening', () =>
  logger.info('Feathers application started on https://' + app.get('host') + ':' + port)
);

//Uncomment below to use HTTP instead of HTTPS
/*
const logger = require('winston');
const app = require('./app');
const port = app.get('port');
const server = app.listen(port);

process.on('unhandledRejection', (reason, p) =>
  logger.error('Unhandled Rejection at: Promise ', p, reason)
);

server.on('listening', () =>
  logger.info('Feathers application started on http://%s:%d', app.get('host'), port)
);
*/
