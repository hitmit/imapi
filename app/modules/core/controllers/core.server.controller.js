'use strict';

var path = require('path'),
  config = require(path.resolve('./app/config/config')),
  async = require('async');
  // nodemailer = require('nodemailer');

// var smtpTransport = nodemailer.createTransport(config.mailer.options);


/**
 * Render the main application page
 */
exports.renderIndex = function(req, res) {
  res.json({
    user: req.user || null
  });
};

/**
 * Render the server error page
 */
exports.renderServerError = function(req, res) {
  res.status(500).format({
    'application/json': function() {
      res.json({
        error: 'Oops! Something went wrong...'
      });
    },
    'default': function() {
      res.json({
        error: 'Oops! Something went wrong...'
      });
    }
  });
};

/**
 * Render the server not found responses
 * Performs content-negotiation on the Accept HTTP header
 */
exports.renderNotFound = function(req, res) {

  res.status(404).format({
    'application/json': function() {
      res.json({
        error: 'Path not found'
      });
    },
    'default': function() {
      res.json({
        error: 'Path not found'
      });
    }
  });
};
