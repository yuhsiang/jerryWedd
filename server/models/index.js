const mongoose = require('mongoose');

module.exports = (function() {
  'use strict';

  /**
   * Global Constants
   */

  /**
   * Main
   */
  return {
    connect,
  };

  /**
   * Functions
   */
  function connect(uri) {
    mongoose.connect(uri);
    mongoose.Promise = global.Promise;
    mongoose.connection.on('error', (err) => {
      console.error(`Mongoose connection error: ${err}`);
      process.exit(1);
    });

    // load models
    require('./question');
  };

})();
