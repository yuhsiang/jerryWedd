const debug = require('debug')('router:question');
const express = require('express');
const superAgent = require('superagent');
const Question = require('../models/question');

module.exports = (function() {
  'use strict';

  /**
   * Global Constants
   */
  const ACCESS_TOKEN = 'CQLF4DslHGmjiARzC1DqWFDkRAZNI6PVyJjz2i1UYSapGphVeDy8hLpwJBaSbK8Y';
  const ROUTES = {
    GET: '/:id',
    ANSWER: '/:id/answer',
    START: '/start',
    FINISH: '/:id/finish',
  };

  /**
   * Main
   */
  const router = new express.Router();

  router.get(ROUTES.GET, get);
  router.post(ROUTES.ANSWER, answer);
  router.post(ROUTES.START, start);

  return router;

  /**
   * Functions
   */
  function get(req, res, next) {
    const qId = req.params.id;

    debug('get qId: %s', qId);
    Question.findById(qId)
      .then(question => {
        return res.status(200).json({
          success: true,
          question,
        });
      })
      .catch(err => {
        return res.status(500).json({
          success: false,
          err,
        });
      });
  }

  function answer(req, res, next) {
    /**
     * result
     * - ownerId
     * - userEmail
     * - yes: options[0].status
     * - interactiveMessageId
     */
    const result = req.body;
    const qId = req.params.id;
    const ans = {
      userEmail: result.userEmail,
      yes: result.options[0].status,
    };

    /**
     * resonse data
     * - interactiveResultId
     * - status: OK/FAIL
     */
    debug('answer (qId: %s): %j', qId, result);
    setQuestionAnswer(qId, ans)
      .then(() => {
        return res.status(200).json({
          interactiveResultId: result.interactiveMessageId,
          status: 'OK',
        });
      })
      .catch(err => {
         return res.status(200).json({
          interactiveResultId: result.interactiveMessageId,
          status: 'FAIL',
        });
      });
  }

  function start(req, res, next) {
    getQuestion()
      .then(question => sendInteractiveMessage(question))
      .then(msg => setQuestionExpTime(msg.question, msg.expiredTime))
      .then(question => {
        return res.status(200).json({
          success: true,
          question,
        });
      })
      .catch(err => {
        return res.status(500).json({
          success: false,
          error: err,
        });
      });
  }

  function sendInteractiveMessage(question) {
    return new Promise((resolve, reject) => {
      if (!question) {
        return reject();
      }

      const API_PATH = 'https://im.office.openfind.com.tw/api/interactiveMessages';
      const params = {
        clientKey: 'ae6447607a3f0587df860ce793d7050504222141',
        applicationId: 'c28dd858e8141e150ae12ea05d2702dc',
        roomId: '58626be35550e18f33d4763d',
        type: 'yesno',
      };

      params.expiredTime = getExpTime();
      params.text = question.title;
      params.callback = `http://139.162.49.146/api/question/${question.id}/answer`;

      debug('send interactive message: %j', params);
      superAgent
        .post(API_PATH)
        .set('authorization', ACCESS_TOKEN)
        .send(params)
        .end((err, response) => {
          if (err) {
            return reject(err);
          }

          return resolve({
            question,
            expiredTime: params.expiredTime,
          });
        });
    });
  }

  function getQuestion() {
    return new Promise((resolve, reject) => {
      const query = {
        expiredTime: 0
      };

      Question.findOne(query)
        .then(question => {
          debug('get question: %j', question);
          return resolve(question);
        })
        .catch(err => {
          console.error(err);
          return reject(err);
        });
    });
  }

  function setQuestionExpTime(question, expiredTime) {
    return new Promise((resolve, reject) => {
      question.expiredTime = expiredTime;
      question.save(err => {
        if (err) {
          console.error(err);
          return reject(err);
        };

        return resolve(question);
      });
    });
  }

  function setQuestionAnswer(qId, answer) {
    debug('set question %s answer: %j', qId, ans);
    return new Promise((resolve, reject) => {
      Question.findById(qId)
        .then(question => {
          const { userEmail, yes, no } = answer;
          const prevAnswer = {
            yes: question.yes.indexOf(userEmail),
            no: question.no.indexOf(userEmail),
          };

          if (answer.yes) {
            if (0 <= prevAnswer.yes) return resolve();
            if (0 <= prevAnswer.no) question.no.splice(prevAnswer.no, 1);
            question.yes.push(answer.userEmail);
          } else {
            if (0 <= prevAnswer.no) return resolve();
            if (0 <= prevAnswer.yes) question.yes.splice(prevAnswer.yes, 1);
            question.no.push(answer.userEmail);
          }

          question.save(err => {
            if (err) {
              console.error(err);
              return reject(err);
            }

            return resolve();
          });
        })
        .catch(err => {
          console.error(err);
          return reject(err);
        });
    });
  }

  function getExpTime() {
    const expiredTime = new Date();
    expiredTime.setSeconds(expiredTime.getSeconds() + 30);
    return expiredTime;
  }

})();
