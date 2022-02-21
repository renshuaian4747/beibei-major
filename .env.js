const { version } = require('./package.json');

const DEV_API = JSON.stringify('./');
const PROD_API = JSON.stringify('./');

module.exports = {
  'process.env.API_URL': process.env.NODE_ENV === 'production' ? PROD_API : DEV_API,
  'process.env.VERSION': JSON.stringify(version || '_'),
  'process.env.CI_COMMIT_SHA': JSON.stringify(process.env.CI_COMMIT_SHA || '_'),
  'process.env.CI_BUILD_TIME': JSON.stringify(new Date())
};
