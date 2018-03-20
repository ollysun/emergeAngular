(() => {
  'use strict';
  /* eslint no-console: 0 */
  let ENV = process.env.NODE_ENV || 'development',
    express = require('express'),
    session = require('express-session'),
    moment = require('moment'),
    cors = require('cors'),
    app = express(),
    config = {},
    routes = require('./routes'),
    path = require('path'),
    methodOverride = require('method-override'),
    cookieParser = require('cookie-parser'),
    SQLiteStore = require('connect-sqlite3')(session),
    bodyParser = require('body-parser');

  module.exports = (appdir, cb) => {
    app.dir = path.join(__dirname, '../');
    app.use(cors({
      origin: '*'
    }));
    app.use(bodyParser.json());
    app.use(methodOverride());
    app.use(cookieParser());
    // To support URL-encoded bodies
    app.use(bodyParser.urlencoded({
      extended: false
    }));

    app.use(session({
      store: new SQLiteStore,
      secret: '4de1e493-c647-4847-87e6-4425ee649deb',
      resave: true,
      saveUninitialized: true,
      cookie: {
        maxAge: 7 * 24 * 60 * 60 * 1000
      }
    }));

    // Static files
    app.use(express.static(path.join(app.dir, './dist')));
    // things to do on each request
    app.use((req, res, next) => {
      // Log each request in development/staging ENVironment
      if (ENV !== 'production') {
        console.log(moment().format('HH:MM'), req.method, req.url,
          req.socket.bytesRead, 'process:', process.pid);
      }
      next();
    });

    // Standard error handling
    app.use((err, req, res, next) => {
      console.error(err.stack);
      res.status(500).send('Something broke!');
      next();
    });

    routes(app, config);
    // Callback from /index.js
    cb(app);
  };
})();
