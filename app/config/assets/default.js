'use strict';

module.exports = {
  server: {
    allJS: ['server.js', 'config/**/*.js', 'app/modules/*/**/*.js'],
    models: 'app/modules/*/models/**/*.js',
    routes: ['app/modules/!(core)/routes/**/*.js', 'app/modules/core/routes/**/*.js'],
    config: 'app/modules/*/config/*.js',
    policies: 'app/modules/*/policies/*.js',
  }
};
