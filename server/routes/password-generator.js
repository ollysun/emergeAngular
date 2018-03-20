const generatePassword = require('password-generator');

module.exports = (app) => {
  'use strict';

  // Password Generator
  app.route('/api/generate-password')
    .get((req, res) => {
      return res.send({
        password: generatePassword(8, false)
      });
    });
};
