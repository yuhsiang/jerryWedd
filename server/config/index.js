const fs = require('fs');
const path = require('path');

module.exports = (function() {
  'use strict';

  /**
   * Global Constants
   */
  const DOTENV_PATH = path.resolve(__dirname, '../../.env');

  /**
   * Main
   */
  try {
    const stat = fs.statSync(DOTENV_PATH);
    if (!stat || stat.isFile()) {
      require('dotenv')
        .config({
          path: DOTENV_PATH
        });
    }
  } catch(e) {
    // do nothing when file not exists
  }

  return {
    port: process.env.PORT || 3000,
    dbUri: process.env.MONGODB_URI || 'mongodb://localhost/jerry',
  };

  /**
   * Functions
   */

})();
