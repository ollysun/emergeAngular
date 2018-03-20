const user = {
  name: 'Michael Smith',
  username: 'emerge',
  role: 'bo-admin',
  umDomain: '',
  umSessionID: '',
  umUserHash: '',
};

module.exports = (app) => {
  'use strict';

  // Password Generator
  app.route('/api/user/login')
    .post((req, res) => {
      if (req.body.username === user.username &&
        req.body.password === user.username) {
        user.umDomain = req.host;
        user.umDomain = req.host;
        user.umSessionID = req.session.id;
        user.umUserHash = Math.floor(Math.random() * 1000000000);
        req.session.user = user;
        return res.send(user);
      } else {
        res.status(401).send({
          message: 'Invalid login credentials'
        });
      }
    });

  app.route('/api/user/logout')
    .get((req, res) => {
      if (req.session.user) {
        req.session.destroy((err) => {
          if (err) {
            res.status(500).send({
              message: 'Error ending session'
            });
          } else {
            return res.send({
              message: 'Session ended'
            });
          }
        });
      } else {
        res.status(406).send({
          message: 'No session active'
        });
      }
    });

  app.route('/api/user/session')
    .get((req, res) => {
      if (req.session.user) {
        res.send(user);
      } else {
        res.status(401).send({
          message: 'No user logged in'
        });
      }
    });
};
