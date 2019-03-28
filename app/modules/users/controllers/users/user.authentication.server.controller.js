'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  fs = require('fs'),
  request = require('request'),
  async = require('async'),
  errorHandler = require(path.resolve('./app/modules/core/controllers/errors.server.controller')),
  passport = require('passport'),
  db = require(path.resolve('./app/config/lib/sequelize')).models,
  User = db.user;

// URLs for which user can't be redirected on signin
var noReturnUrls = [
  '/authentication/signin',
  '/authentication/signup'
];

/**
 * Signup
 */
exports.signup = function(req, res) {
  // For security measurement we remove the roles from the req.body object
  delete req.body.roles;

  var message = null;

  var user = User.build(req.body);

  user.provider = 'local';
  user.salt = user.makeSalt();
  user.hashedPassword = user.encryptPassword(req.body.password, user.salt);
  user.displayName = user.firstName + ' ' + user.lastName;

  //MUST DELETE THIS WHEN PRODUCTION
  if (req.body.is_admin === true) {
    user.roles = ["admin", "user"];
  } else {
    user.roles = ["user"];
  }

  user.save().then(function() {
    req.login(user, function(err) {
      if (err)
        res.status(400).send({
          message: errorHandler.getErrorMessage(err)
        });
      res.json(user);
    });
  }).catch(function(err) {
    res.status(400).send({
      message: errorHandler.getErrorMessage(err)
    });
  });
};

/**
 * Signin after passport authentication
 */
exports.signin = function(req, res, next) {

  passport.authenticate('local', function(err, user, info) {

    if (err || !user) {
      res.status(400).send({
        message: err
      });
    } else {
      // Remove sensitive data before login
      user.password = undefined;
      user.salt = undefined;

      req.login(user, function(err) {
        if (err) {
          res.status(400).send({
            message: errorHandler.getErrorMessage(err)
          });
        } else {
          res.json(user);
        }
      });
    }
  })(req, res, next);
};

/**
 * Signout
 */
exports.signout = function(req, res) {
  req.logout();
  res.status(200).send({
    message: 'user logout sucessfully..'
  });
};

/**
 * Signout
 */
exports.testFunction = function(req, res) {
  // console.log('test');
  // res.status(200).send({
  //   message: 'test function called successfully..'
  // });
  res.json({ message: 'test function called successfully..' })
};
