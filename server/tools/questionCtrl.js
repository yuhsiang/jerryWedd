#!/usr/bin/env node

const debug = require('debug')('tools:questionCtrl');
const fs = require('fs');
const mongoose = require('mongoose');
const program = require('commander');
const readline = require('readline');
const config = require('../config');
const models = require('../models');

(function() {
  'use strict';

  /**
   * Global Constants
   */
  let Question;

  /**
   * Main
   */
  // initialize
  models.connect(config.dbUri);
  Question = mongoose.model('Question');

  // create question
  program
    .command('create')
    .description('create a question')
    .option('-q, --question <question>', 'create a question by text')
    .option('-f, --file <filename>', 'create one or more questions from a file')
    .action(options => {
      if (options.question) {
        createQuestionByText(options.question)
          .then(() => process.exit());
      } else if (options.file) {
        createQuestionByFile(options.file)
          .then(() => process.exit());
      } else {
        return program.help();
      }
    });

  // list question
  program
    .command('list')
    .description('list all questions')
    .action(listQuestion);

  // remove question
  program
    .command('remove <questionId>')
    .description('remove a question by id')
    .action(questionId => {
      removeQuestion(questionId)
        .then(() => process.exit());
    });

  program
    .version('0.0.1')
    .parse(process.argv);

  /**
   * Functions
   */
  function createQuestionByFile(filename) {
    debug('create question by file: %s', filename);
    return new Promise((resolve, reject) => {
      const questions = [];
      const reader = readline.createInterface({
        input: fs.createReadStream(filename)
      });

      reader.on('line', line => {
        questions.push(createQuestionByText(line.trim()));
      });

      reader.on('close', () => {
        Promise
          .all(questions)
          .then(results => {
            return resolve();
          });
      });
    });
  }

  function createQuestionByText(text) {
    debug('create question by text: %s', text);
    return new Promise((resolve, reject) => {
      const question = {
        title: text.trim(),
        expiredTime: 0,
        yes: [],
        no: [],
      };

      const newQuestion = new Question(question);
      newQuestion.save(err => {
        if (err) {
          console.error(err);
          return resolve();
        }

        console.info('create question success: %s', text);
        return resolve();
      });
    });
  }

  function listQuestion() {
    debug('list question');
    Question.find()
      .then(questions => {
        debug('get questions: %j', questions);
        console.info('questionId\t\t\texpiredTime\t\t\t\tquestion');
        questions.forEach(question => {
          const { id, title, expiredTime } = question;
          console.info(`${id}\t${expiredTime}\t${title}`);
        });
        process.exit();
      })
      .catch(err => {
        console.error(err)
        process.exit();
      });
  }

  function removeQuestion(qId) {
    debug('remove question: %s', qId);
    return new Promise((resolve, reject) => {
      const query = {
        _id: qId
      };

      Question.remove(query)
        .then(info => {
          console.info('remove question success: %s', info);
          return resolve();
        })
        .catch(err => {
          console.error(err);
          return reject(err);
        });
    });
  }

})();
