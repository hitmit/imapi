'use strict';

/**
 * Module dependencies.
 */
var config = require('../config'),
  express = require('./express'),
  // chalk = require('chalk'),
  sequelize = require('./sequelize-connect');
  // winston = require('./winston');


module.exports.init = function init(callback) {
  var app = express.init(sequelize);
  if (callback) callback(app, sequelize, config);
};

module.exports.start = function start(callback) {
  console.log('Initializing SEAN.JS Stack...');

  var _this = this;

  _this.init(function(app, db, config) {

    // Start the app by listening on <port>
    app.listen(config.port, function() {

      // Logging initialization
      console.log('--------------------------');
      console.log(config.app.title);
      console.log('Port:\t\t\t' + config.port);
      console.log('Database:\t\t' + config.db.name);
      if (config.secure && config.secure.ssl === true) {
        console.log('SSL:\t\t\tON');
      }

      console.info('App URL:\t\t' + (process.env.NODE_HOST || 'localhost') + ":" + config.port);
      console.log('--------------------------');

      // if (!config.app.reCaptchaSecret) {
      //   winston.warn('Missing reCaptcha Secret in env!');
      // }

      if (callback) callback(app, db, config);
    });

  });

};