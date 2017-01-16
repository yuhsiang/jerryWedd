const mongoose = require('mongoose');

module.exports = (function() {
  'use strict';

  /**
   * Global Constants
   */

  /**
   * Main
   */
  const QuestionSchema = new mongoose.Schema({
    title: String,
    expiredTime: Date,
    yes: Array,
    no: Array,
  });

  return mongoose.model('Question', QuestionSchema);

  /**
   * Functions
   */

})();
