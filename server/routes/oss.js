const request = require('superagent'),
  config = require('../config');

module.exports = (app) => {
  'use strict';

  let filterRoute = function(url) {
    return url.replace(/\/api\/bss\/(backoffice|selfcare)\//i,
      config.route.bss).replace(/\/api\/ocs\/backoffice\//i, config.route
      .ocs);
  };

  let processRoute = function(req, res, next) {
    req.newURL = filterRoute(req.url);
    req.headers['x-http-token'] = req.headers['x-http-token'] || 'NULL';
    if (req.url.match(/backoffice/i)) {
      if (config.isBackofficeClient) {
        return next();
      } else {
        return res.status(403).send({
          message: 'Unathorized access',
          url: req.url
        });
      }
    }

    next();
  };

  // Midlleware to filter routes
  app.use(processRoute);
  app.route('/api/*')
    .get((req, res) => {
      return request
        .get(req.newURL)
        .set('x-http-token', req.headers['x-http-token'])
        .end((err, response) => {
          if (response && response.ok) {
            res.send(response.body);
          } else {
            res.status(err.status || 500).send(err);
          }
        });
    })
    .post((req, res) => {
      request
        .post(req.newURL)
        .set('x-http-token', req.headers['x-http-token'])
        .send(req.body)
        .end((err, response) => {
          if (response && response.ok) {
            res.send(response.body);
          } else {
            res.status(err.status || 500).send(err);
          }
        });
    })
    .put((req, res) => {
      request
        .put(req.newURL)
        .set('x-http-token', req.headers['x-http-token'])
        .send(req.body)
        .end((err, response) => {
          if (response && response.ok) {
            res.send(response.body);
          } else {
            res.status(err.status || 500).send(err);
          }
        });
    })
    .delete((req, res) => {
      request
        .delete(req.newURL)
        .set('x-http-token', req.headers['x-http-token'])
        .send(req.body)
        .end((err, response) => {
          if (response && response.ok) {
            res.send(response.body);
          } else {
            res.status(err.status || 500).send(err);
          }
        });
    });

};
