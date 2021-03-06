'use strict';

module.exports = {
  app: {
    title: 'Informatics Matrix with Loclio',
    description: 'Full-Stack Javascript with SequelizeJS, ExpressJS, and Node.js',
    keywords: 'sequelizejs, expressjs, nodejs, postgresql, mysql, sqlite3, passport',
    googleAnalyticsTrackingID: process.env.GOOGLE_ANALYTICS_TRACKING_ID || '',
    reCaptchaSecret: process.env.RECAPTCHA_SECRET || ''
  },
  port: process.env.PORT || 3000,
  templateEngine: 'swig',
  // Session Cookie settings
  sessionCookie: {
    // session expiration is set by default to 24 hours
    maxAge: 24 * (60 * 60 * 1000),
    // httpOnly flag makes sure the cookie is only accessed
    // through the HTTP protocol and not JS/browser
    httpOnly: true,
    // secure cookie should be turned to true to provide additional
    // layer of security so that the cookie is set only when working
    // in HTTPS mode.
    secure: Boolean(process.env.ssl) || true
  },
  // sessionSecret should be changed for security measures and concerns
  sessionSecret: 'sessionSecret',
  // sessionKey is set to the generic sessionId key used by PHP applications
  // for obsecurity reasons
  sessionKey: 'sessionId',
  sessionCollection: 'sessions',
  logo: 'app/modules/core/client/img/brand/logo.png',
  favicon: 'app/modules/core/client/img/brand/favicon.ico'
};
