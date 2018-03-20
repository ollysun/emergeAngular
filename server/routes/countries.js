const request = require('superagent');

module.exports = (app) => {
  'use strict';

  // List of countries
  app.route('/api/countries')
    .get((req, res) => {
      if (req.query.live) {
        return request.get('https://restcountries.eu/rest/v1/all').end((err,
          response) => {
          if (response && response.ok) {
            res.send(response.body);
          } else {
            res.status(err.status || 500).send(err);
          }
        });
      } else {
        res.send(require('../data/countries'));
      }
    });
};
