const fs = require('fs');
const path = require('path');

module.exports = (function() {
  'use strict';

  /**
   * Global Constants
   */
  const DOTENV_PATH = path.resolve(__dirname, '../../.env');
  const ROOT_PATH = path.resolve(__dirname, '../../');

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
    port: process.env.PORT || 8080,
    dbUri: process.env.MONGODB_URI || 'mongodb://172.17.0.1/jerry',
    ROOT_PATH: ROOT_PATH
  };

  /**
   * Functions
   */

})();
