'use strict';

var defaultEnvConfig = require('./default');

module.exports = {
  port: process.env.PORT || 3001,
  db: {
    name: process.env.DB_NAME || "dbname",
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 3306,
    username: process.env.DB_USERNAME || "dbuser",
    password: process.env.DB_PASSWORD || "dbpass",
    dialect: process.env.DB_DIALECT || "mysql", //mysql, postgres, sqlite3,...
    enableSequelizeLog: process.env.DB_LOG || false,
    ssl: process.env.DB_SSL || false,
    sync: process.env.DB_SYNC || true //Synchronizing any model changes with database
  },
  app: {
    title: defaultEnvConfig.app.title + ' - Test Environment'
  },
  mailer: {
    from: process.env.MAILER_FROM || 'MAILER_FROM',
    options: {
      service: process.env.MAILER_SERVICE_PROVIDER || 'MAILER_SERVICE_PROVIDER',
      auth: {
        user: process.env.MAILER_EMAIL_ID || 'MAILER_EMAIL_ID',
        pass: process.env.MAILER_PASSWORD || 'MAILER_PASSWORD'
      }
    }
  }
};