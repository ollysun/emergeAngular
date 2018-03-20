const oss = require('./oss'),
  countries = require('./countries'),
  users = require('./users'),
  passwordGenerator = require('./password-generator');

module.exports = (app) => {
  'use strict';

  countries(app);
  users(app);
  passwordGenerator(app);
  // JSON Object of status codes
  app.route('/api/status-codes').get((req, res) => {
    res.send(require('http').STATUS_CODES);
  });

  oss(app);
  app.route('/*').get((req, res) => {
    res.sendFile('index.html', {
      root: './dist/'
    });
  });
};
