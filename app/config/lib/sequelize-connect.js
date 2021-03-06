"use strict";

// var fs = require('fs');
var path = require('path');
// var Sequelize = require('sequelize');
var _ = require('lodash');
var config = require('../config');
// var winston = require('./winston');

console.log('Initializing Sequelize...');

var orm = require('./sequelize');

var models = [];

config.files.server.models.forEach(function(file) {
  models.push(path.resolve(file));
});
// console.log(config.files);
orm.discover = models;
orm.connect(config.db.name, config.db.username, config.db.password, {
  host: config.db.host,
  port: config.db.port,
  dialect: config.db.dialect,
  storage: config.db.storage,
  logging: config.db.enableSequelizeLog ? winston.verbose : false,
  dialectOptions: {
    ssl: config.db.ssl ? config.db.ssl : false
  }
});