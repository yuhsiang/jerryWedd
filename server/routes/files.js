const debug = require('debug')('router:files');
const express = require('express');
const superAgent = require('superagent');
const config = require('../config');
const path = require('path');
const formidable = require('formidable');
const mongoose = require('mongoose');
const grid = require('gridfs-stream');
const fs = require('fs');
const util = require('util');

module.exports = (function() {
  'use strict';

  /**
   * Global Constants
   */
  const ROUTES = {
    UPLOAD: '/upload',
    IMAGES: '/images',
    DISPLAY: '/display/:id'
  };

  const PATH_TEMP = path.resolve(config.ROOT_PATH, 'data');

  /**
   * Main
   */
  const router = new express.Router();

  router.post(ROUTES.UPLOAD, upload);
  router.get(ROUTES.IMAGES, images);
  router.get(ROUTES.DISPLAY, display);

  return router;

  function upload(req, res) {
    const form = new formidable.IncomingForm();
    console.log(PATH_TEMP);
    form.uploadDir = PATH_TEMP;
    form.keepExtensions = true;

    form.parse(req, function(err, fields, files) {
      if (err) {
        return;
      }
      console.log('File uploaded : ' + files.file.path);
      let filePath = files.file.path;
      const conn = mongoose.createConnection(config.dbUri);
      grid.mongo = mongoose.mongo;
      conn.once('open', function () {
        const gfs = grid(conn.db);
        const writestream = gfs.createWriteStream({
          filename: files.file.name,
          metadata: {test: 'this is a test'}
        });
        const stream = fs.createReadStream(files.file.path).pipe(writestream);

        var had_error = false;
        stream.on('error', function(err){
          had_error = true;
        });
        stream.on('close', function(){
          if (filePath !== undefined) {
          fs.unlink(filePath);
          }
        });
      });
    });
    form.on('end', function() {
      res.send('Completed ..... go and check fs.files & fs.chunks in  mongodb');
    });
  }

  function images(req, res) {
    const conn = mongoose.createConnection(config.dbUri);

    conn.once('open',  () => {
      const gfs = grid(conn.db, mongoose.mongo);
      gfs.files.find().toArray((err, files) => {
        console.log(files);
        console.log(files[0].uploadDate);
        const images = files.map((f) => ({id: f._id, filename: f.filename}));
        const resJSON = {images: images};
        res.end(JSON.stringify(resJSON));
      });
    });
  };

  function display(req, res) {
    const conn = mongoose.createConnection(config.dbUri);
    conn.once('open',  () => {
      try {
        const gfs = grid(conn.db, mongoose.mongo);
        var readstream = gfs.createReadStream(
          {
            _id: req.params.id
          }
        );
        readstream.pipe(res);
        readstream.on('error', function (err) {
          res.end('Would you stop trying?');
        });
      } catch (e) {
        // res.end(e);
      }

    });
  };
})();
