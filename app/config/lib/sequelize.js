"use strict";

var
  path = require('path'),
  config = require(path.resolve('./app/config/config')),
  Sequelize = require('sequelize'),
  // winston = require('./winston'),
  db = {};

db.Sequelize = Sequelize;
db.models = {};
db.discover = [];

// Expose the connection function
db.connect = function(database, username, password, options) {

  if (typeof db.logger === 'function')
    console.log("Connecting to: " + database + " as: " + username);

  // Instantiate a new sequelize instance
  var sequelize = new db.Sequelize(database, username, password, options);


  db.discover.forEach(function(location) {
    var model = sequelize["import"](location);
    if (model)
      db.models[model.name] = model;
  });

  // Execute the associate methods for each Model
  Object.keys(db.models).forEach(function(modelName) {
    if (db.models[modelName].options.hasOwnProperty('associate')) {
      db.models[modelName].options.associate(db.models);
      console.log("Associating Model: " + modelName);
    }
  });

  if (config.db.sync) {
    // Synchronizing any model changes with database.
    sequelize.sync()
      .then(function() {
        console.log("Database synchronized");
      }).catch(function(err) {
        console.log("An error occured: %j", err);
      });
  }

  db.sequelize = sequelize;

  console.log("Finished Connecting to Database");

  return true;
};

module.exports = db;