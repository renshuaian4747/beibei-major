const fs = require('fs');
const path = require('path');
const { VERSION, CI_BUILD_TIME, CI_COMMIT_SHA } = require('../.env');

fs.writeFileSync(
  path.resolve(__dirname, '../dist/assets/version.json'),
  JSON.stringify(
    {
      VERSION,
      CI_BUILD_TIME,
      CI_COMMIT_SHA
    },
    undefined,
    2
  )
);
